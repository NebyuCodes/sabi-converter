import { RequestHandler } from "express";
import { AppError, NoFileUploaded } from "../../../../shared/errors";
import { redisQueue } from "../../../../shared/redisQueue";
import { NoQueueJob } from "../../../../shared/errors/no-queue-job.error";
import { NotBuffer } from "../../../../shared/errors/not-buffer.error";

export const convertVideoToAudio: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return next(new NoFileUploaded());

    const { duration } = <Conversion.IConvert>req.body;
    if (!duration) return next(new AppError("Duration is required", 400));

    if (!Buffer.isBuffer(file.buffer)) return next(new NotBuffer());

    const converter = redisQueue();
    const job = await converter.add({
      videoBuffer: file.buffer.toString("base64"),
      duration,
    });

    res.status(200).json({
      status: "SUCCESS",
      message: "The conversion process has started. It might take few minutes.",
      jobId: job.id,
    });
  } catch (error) {
    next(error);
  }
};

export const jobStatus: RequestHandler = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const converter = redisQueue();
    const job = await converter.getJob(jobId);
    if (!job) return next(new NoQueueJob());

    res.status(200).json({
      status: "SUCCESS",
      data: {
        id: job.id,
        status: job.finishedOn
          ? "completed"
          : job.failedReason
          ? "failed"
          : "waiting",
        progress: job.progress,
      },
    });
  } catch (error) {
    next(error);
  }
};
