import { Router } from "express";
import { getPdfFile, registerCandidate } from "./controllers";
import { uploadMulterMiddleware } from "./multerMiddleware";

const router = Router();

router.post(
  "/register",
  uploadMulterMiddleware.fields([{ name: "pdfFile", maxCount: 1 }]),
  registerCandidate
);

router.get("/files/:filename", getPdfFile);

export default router;
