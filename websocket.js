require("dotenv").config();

const ENV = process.env;
const EchoServer = require("laravel-echo-server");
const options = {
  authHost: ENV.APP_URL,
  devMode: true,
  host: ENV.REDIS_BROADCAST_URL,
  port: ENV.REDIS_BROADCAST_PORT,
  allowOrigin: "http://saelos.test:80"
};

EchoServer.run(options);
