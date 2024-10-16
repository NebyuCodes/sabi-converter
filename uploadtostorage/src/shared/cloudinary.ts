import { v2 } from "cloudinary";
import { configs } from "../config";

v2.config({
  cloud_name: configs.cloudinary.name,
  api_key: configs.cloudinary.api_key,
  api_secret: configs.cloudinary.secret,
});

// v2.config({
//   cloud_name: "dxw1bya2v",
//   api_key: "225341641339217",
//   api_secret: "AMqmcccZKbZRlVKiTkt0OI_DPMI",
// });

export { v2 as cloudinary };
