import { Router } from "express";
const router = Router();

import { convertVideoToAudio, jobStatus } from "./controller";
import { upload } from "../../../../shared/multer-uploader";

router.post("/", upload.single("video"), convertVideoToAudio);

router.get("/:id", jobStatus);

export default router;
