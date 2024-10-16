import { app } from "./app";
import { createServer } from "http";

export const bootstrap = () => {
  const server = createServer(app);
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on ${port}...`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server is closing");
    });
  });
};
