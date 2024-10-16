import { createClient } from "redis";
import { configs } from "../../config";

const redisClient = createClient({
  url: `redis://${configs.redis.docker.host}:${configs.redis.docker.port}`,
});

redisClient.on("connect", () => {
  console.log(`Redis client is connected successfully`);
});

redisClient.on("error", (error) => {
  console.log(error);
  console.error("Error while connecting to Redis");
});

export { redisClient };
