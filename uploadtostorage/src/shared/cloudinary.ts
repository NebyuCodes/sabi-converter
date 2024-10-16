import { v2 } from "cloudinary";
import { configs } from "../config";

v2.config({
  cloud_name: configs.cloudinary.name,
  api_key: configs.cloudinary.api_key,
  api_secret: configs.cloudinary.secret,
});

export { v2 as cloudinary };
