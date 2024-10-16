import Queue from "bull";
import { configs } from "../config";
import { PassThrough } from "stream";
import Ffmpeg from "fluent-ffmpeg";
import { AppError } from "./errors";
import Bull from "bull";
import { NotBuffer } from "./errors/not-buffer.error";
import axios from "axios";

export const redisQueue = (): Bull.Queue => {
  const converterQueue = new Queue("conversion", {
    redis: {
      host: configs.redis.docker.host,
      port: configs.redis.docker.port,
    },
  });

  converterQueue.process((job, done) => {
    const videoBuffer = Buffer.from(job.data.videoBuffer, "base64");
    if (!Buffer.isBuffer(videoBuffer)) throw new NotBuffer();

    const videoStream = new PassThrough();
    videoStream.end(videoBuffer);

    const audioBuffer: Buffer[] = [];
    const audioStream = new PassThrough();

    Ffmpeg(videoStream)
      .toFormat("mp3")
      .audioCodec("libmp3lame")
      .duration(job.data.duration)
      .on("error", (error) => {
        console.error(error);
        done(
          new AppError(
            "Unable to convert the video stream to audio stream.",
            400
          )
        );
      })
      .on("start", () => {
        console.log("Started processing...");
      })
      .on("progress", (progress) => {
        console.log(`Processing...`);
      })
      .pipe(audioStream, { end: true });

    audioStream.on("data", (chunk) => {
      if (!Buffer.isBuffer(chunk)) throw new NotBuffer();
      audioBuffer.push(chunk);
    });

    audioStream.on("end", () => {
      const finalBuffer = Buffer.concat(audioBuffer);

      console.log(finalBuffer);
      // Upload the buffer to cloud storage
      const uploadedBuffer = finalBuffer.toString("base64");
      console.log(uploadedBuffer);

      axios
        .post(configs.urls.uploader, { audioBuffer: uploadedBuffer })
        .then((response) => {
          done();
        })
        .catch((error) => {
          console.error(error);
          throw new AppError("Unable to upload.", 400);
        });

      done();
    });

    audioStream.on("error", (error) => {
      console.error(error);
      done(new AppError("Error while converting the file", 400));
    });
  });

  // Listen for completed and failed events
  converterQueue.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  converterQueue.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
  });

  return converterQueue;
};
