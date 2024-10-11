/* eslint-disable @typescript-eslint/no-require-imports */
const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
  console.log("Error connecting to Redis:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

module.exports = client;
