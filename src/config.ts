export const configData = {
  api: {
    env: process.env.NODE_ENV,
    port: process.env.API_PORT,
    tokenSecret: process.env.TOKEN_SECRET,
  },
  mainDatabase: {
    host: process.env.DB_MAIN_HOST,
    user: process.env.DB_MAIN_USER,
    port: process.env.DB_MAIN_PORT,
    pass: process.env.DB_MAIN_PASS,
    name: process.env.DB_MAIN_NAME,
  },
  mqttConnection: {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  }
};
