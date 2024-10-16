import { conversion } from "../../../api/v1/resources";
import { app } from "../../app";

export const v1 = () => {
  app.use("/api/v1/convert/", conversion);
};
