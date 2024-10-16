import { config } from "dotenv";
config();

const configs = {
  env: <string>process.env.NODE_ENV,
  cloudinary: {
    name: <string>process.env.CLOUDINARY_CLOUD_NAME,
    api_key: <string>process.env.CLOUDINARY_API_KEY,
    secret: <string>process.env.CLOUDINARY_API_SECRET,
  },
};

export { configs };
