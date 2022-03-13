import { UpdateDeviceValueDto } from '@/dtos/devices.dto';
import { DeviceCmd } from '@/enum/cmd.enum';
import { MqttPayload } from '@/interfaces/mqtt.interface';
import DeviceService from '@/services/devices.service';
import { connect as mqttConnect, MqttClient } from 'mqtt';
import { mqttConnection } from '.';

const base_topic = process.env.BASE_TOPIC || 'h2';

class MqttHandler {
  public client: MqttClient;
  public deviceService = new DeviceService();

  constructor() {
    console.log('Connecting to broker');
    this.connect();
  }

  private connect() {
    this.client = mqttConnect(mqttConnection.url, mqttConnection.options as any);
    this.onConnection(this.client);
    this.onMessage(this.client);
    this.onClose(this.client);
  }

  private onConnection(client: MqttClient) {
    client.on('connect', function () {
      const msg: MqttPayload = {
        cmd: 'online',
        msg: 'true'
      }
      client.publish(`${base_topic}/service`, JSON.stringify(msg), {
        retain: true,
        qos: 0,
      });

      client.subscribe(`${base_topic}/#`);
      console.log(`MQTT connected and listening to : ${base_topic}`);
    });
  }
  //homein2/abcdef123456789/ack/light_1
  /**
   * 
   * base/mac
   * cmd = set - ip - online - offline
   * {"cmd":"set","node":"light_1","msg":"true"}
   */
  private onMessage(client: MqttClient) {
    client.on('message', async (topic, message) => {
      try {
        const key = topic.toString();
        const pld = message.toString();
        console.log(`Data :: ${key} ${pld}`);

        const splitedTopic = key.split('/');
        const deviceData: any = {
          base: splitedTopic[0],
          devMac: splitedTopic[1],
          pld,
        };

        await this.checkCMD(deviceData);
      } catch (error) {
        console.log(error);
      }
    });
  }

  private onClose(client: MqttClient) {
    client.on('close', function () {
      console.log('MQTT Client :: Not connected to broker!');
    });
  }

  public publishMessage(topic: string, msg: string) {
    this.client.publish(topic, msg, err => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  async checkCMD(data: any) {
    try {
      // console.log(data);
      const parsedPayload: MqttPayload = JSON.parse(data.pld);
      if (!parsedPayload.cmd) return;
      console.log(`Cmd: ${parsedPayload.cmd}`);
      switch (parsedPayload.cmd) {
        case DeviceCmd.ACK: {
          const deviceData: UpdateDeviceValueDto = { value: data.msg };
          await this.deviceService.updateDevice(data.devMac, deviceData, true);
          break;
        }
        case DeviceCmd.IP: {
          const deviceData: UpdateDeviceValueDto = { ip: data.msg };
          await this.deviceService.updateDevice(data.devMac, deviceData, true);
          break;
        }
        default: {
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default MqttHandler;
