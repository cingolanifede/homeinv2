import { UpdateDeviceValueDto } from '@/dtos/devices.dto';
import { DeviceCmd } from '@/enum/cmd.enum';
import DeviceService from '@/services/devices.service';
import { connect as mqttConnect, MqttClient } from 'mqtt';
import { mqttConnection } from '.';

const base_topic = 'homein2';

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
      client.publish(`${base_topic}/service`, 'online', {
        retain: true,
        qos: 0,
      });

      client.subscribe(`${base_topic}/#`);
      console.log(`MQTT connected and listening to : ${base_topic}`);
    });
  }
  //homein2/abcdef123456789/ack/light_1
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
          devCmd: splitedTopic[2],
          devNode: splitedTopic[3],
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
    switch (data.devCmd) {
      case DeviceCmd.ACK: {
        console.log(DeviceCmd.ACK);
        const deviceData: UpdateDeviceValueDto = { value: data.pld };
        await this.deviceService.updateDevice(data.devMac, deviceData, true);
        break;
      }
      case DeviceCmd.IP: {
        console.log(DeviceCmd.IP);
        const deviceData: UpdateDeviceValueDto = { ip: data.pld };
        await this.deviceService.updateDevice(data.devMac, deviceData, true);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default MqttHandler;
