export interface mqttConfig {
  host: string;
  port: string;
  username: string;
  password: string;
}

export interface MqttPayload {
  cmd?: string;
  node?: string;
  msg?: string;
}
