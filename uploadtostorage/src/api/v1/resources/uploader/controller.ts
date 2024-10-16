import { RequestHandler } from "express";
import { AppError } from "../../../../shared/errors";
import { cloudinary } from "../../../../shared/cloudinary";

export const uploadBuffer: RequestHandler = async (req, res, next) => {
  try {
    const { audioBuffer } = <Uploader.IUpload>req.body;

    if (!audioBuffer)
      return next(new AppError("Audio Buffer is required", 400));

    const uploadedBuffer = Buffer.from(audioBuffer, "base64");

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error)
            return next(new AppError("Unable to upload to Cloudinary.", 400));

          res.status(200).json({
            status: "SUCCESS",
            message: "Audio is successfully uploaded",
            data: {
              result,
            },
          });
        }
      )
      .end(uploadedBuffer);
  } catch (error) {
    next(error);
  }
};
