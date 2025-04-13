import mongoose, { Schema } from "mongoose";

const PDFSchema = new Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  pdfFile: {
    type: String,
    required: true,
  },
});

export const PDFModel = mongoose.model("PDF", PDFSchema);
