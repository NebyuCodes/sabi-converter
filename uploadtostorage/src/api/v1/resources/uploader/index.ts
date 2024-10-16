import { Router } from "express";
const router = Router();

import { uploadBuffer } from "./controller";

router.post("/", uploadBuffer);

export default router;
