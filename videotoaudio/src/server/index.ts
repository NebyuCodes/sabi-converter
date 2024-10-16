import { app } from "./app";
import { createServer } from "http";
import { redisClient } from "./dbs";
import { redisQueue } from "../shared/redisQueue";

export const bootstrap = () => {
  const server = createServer(app);
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on ${port}...`);
  });

  const graceFulShutdown = async () => {
    try {
      server.close(() => {
        console.log("Server is closing.");
      });

      await redisClient.quit();
      await redisQueue().close();

      console.log("Exiting");
    } catch (error) {
      console.error("Error during shutdown", error);
      process.exit(1);
    }
  };

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(0);
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception thrown:", error);
    process.exit(0);
  });

  process.on("SIGINT", graceFulShutdown);
  process.on("SIGTERM", graceFulShutdown);
};
