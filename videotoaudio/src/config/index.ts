import { config } from "dotenv";
config();

const configs = {
  env: <string>process.env.NODE_ENV,
  redis: {
    local: {
      host: "localhost",
      port: 6379,
    },
    docker: {
      host: <string>process.env.REDIS_LOCAL_HOST,
      port: process.env.REDIS_LOCAL_PORT as unknown as number,
    },
  },
  urls: {
    uploader: <string>process.env.UPLOADER_URL,
  },
};

export { configs };
