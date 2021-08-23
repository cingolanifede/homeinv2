import config from 'config';
import { mqttConfig } from '@/interfaces/mqtt.interface';

const { host, port, username, password }: mqttConfig = config.get('mqttConfig');

export const mqttConnection = {
  url: `mqtt://${username}:${password}@${host}:${port}`,
  options: {
    clientId: 'updater_' + Math.random().toString(16).substr(2, 8),
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    connectTimeout: 5000,
    clean: true,
    rejectUnauthorized: false,
    // will: {
    //   topic: '/service/updater/state',
    //   payload: 'offline',
    //   retain: true,
    // },
  },
};
