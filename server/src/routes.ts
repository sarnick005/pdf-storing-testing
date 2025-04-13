// Update your router.ts file:

import { Router } from "express";
import { getPdfFile, registerCandidate, getPdfByRollNo } from "./controllers";
import { uploadMulterMiddleware } from "./multerMiddleware";

const router = Router();

router.post(
  "/register",
  uploadMulterMiddleware.fields([{ name: "pdfFile", maxCount: 1 }]),
  registerCandidate
);

router.get("/getPdfByRollNo/:rollNo", getPdfByRollNo);

router.get("/files/temp/:filename", getPdfFile);

export default router;
