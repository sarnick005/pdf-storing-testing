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

  // Check if roll number already exists
  const existingEntry = await PDFModel.findOne({ rollNo });
  if (existingEntry) {
    // Update the existing entry with new PDF
    existingEntry.pdfFile = pdfFilePath;
    await existingEntry.save();
    return res.status(200).json({ msg: "Updated", data: existingEntry });
  }

  // Create new entry
  const newEntry = await PDFModel.create({
    rollNo,
    pdfFile: pdfFilePath,
  });

  return res.status(201).json({ msg: "Registered", data: newEntry });
});

export const getPdfFile = asyncHandler(async (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.resolve("public", "temp", filename); 
  return res.sendFile(filePath);
});


export const getPdfByRollNo = asyncHandler(
  async (req: Request, res: Response) => {
    const { rollNo } = req.params;

    if (!rollNo) {
      return res.status(400).json({ msg: "Roll number is required" });
    }

    const pdf = await PDFModel.findOne({ rollNo: Number(rollNo) });

    if (!pdf) {
      return res.status(404).json({ msg: "No PDF found for this roll number" });
    }

    return res.status(200).json({ msg: "PDF found", data: pdf });
  }
);
