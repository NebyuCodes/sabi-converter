import { app } from "../../app";
import { uploader } from "../../../api/v1/resources";

export const v1 = () => {
  app.use("/api/v1/uploader", uploader);
};
