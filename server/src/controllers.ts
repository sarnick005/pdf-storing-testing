import { Request, Response } from "express";
import { PDFModel } from "./models";
import { asyncHandler } from "./utils/async-handler";
import path from "path";

export const registerCandidate = asyncHandler(async (req: any, res) => {
  const { rollNo } = req.body;
  const pdfFilePath = req.files?.pdfFile?.[0]?.path;

  if (!rollNo || !pdfFilePath) {
    return res.status(400).json({ msg: "Missing rollNo or file" });
  }

  const newEntry = await PDFModel.create({
    rollNo,
    pdfFile: pdfFilePath,
  });

  return res.status(201).json({ msg: "Registered", data: newEntry });
});
export const getPdfFile = asyncHandler(async (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.resolve("public", "temp", filename); // Use path.resolve for cross-platform

  return res.sendFile(filePath);
});
