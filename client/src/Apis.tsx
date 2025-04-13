// File: src/apis.tsx

// Use environment variable with fallback
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface RegistrationResponse {
  msg: string;
  data: {
    rollNo: number;
    pdfFile: string;
    _id: string;
    __v: number;
  };
}

interface PdfSearchResponse {
  msg: string;
  data: {
    rollNo: number;
    pdfFile: string;
    _id: string;
    __v: number;
  };
}

// Register a new PDF
export const registerPdf = async (
  rollNo: string,
  pdfFile: File
): Promise<RegistrationResponse> => {
  const formData = new FormData();
  formData.append("rollNo", rollNo);
  formData.append("pdfFile", pdfFile);

  const response = await fetch(`${BACKEND_URL}/api/v1/register`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

// Get PDF by roll number
export const getPdfByRollNo = async (
  rollNo: string
): Promise<PdfSearchResponse> => {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/getPdfByRollNo/${rollNo}`,
    {
      method: "GET",
    }
  );

  if (response.status === 404) {
    throw new Error("No PDF found for this roll number");
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

// Get full PDF URL
export const getPdfUrl = (pdfPath: string): string => {
  const pdfFilename = pdfPath.split("\\").pop() || pdfPath.split("/").pop();
  return `${BACKEND_URL}/files/temp/${pdfFilename}`;
};
