export {};

declare global {
  namespace Uploader {
    interface IUpload {
      audioBuffer: string;
    }
  }
}
