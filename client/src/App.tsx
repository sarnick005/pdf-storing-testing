// File: src/App.tsx
import { useState, useRef } from "react";
import "./App.css";
import { registerPdf, getPdfByRollNo, getPdfUrl } from "./Apis";

function App() {
  const [rollNo, setRollNo] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchRollNo, setSearchRollNo] = useState<string>("");
  const [viewerPdfUrl, setViewerPdfUrl] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"register" | "view">("register");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please select a PDF file");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollNo.trim()) {
      setError("Please enter a roll number");
      return;
    }

    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setPdfUrl(null);

    try {
      const result = await registerPdf(rollNo, file);
      setSuccess(true);
      setPdfUrl(getPdfUrl(result.data.pdfFile));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRollNo("");
    setFile(null);
    setSuccess(false);
    setPdfUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchRollNo.trim()) {
      setSearchError("Please enter a roll number to search");
      return;
    }

    setSearchLoading(true);
    setSearchError(null);
    setViewerPdfUrl(null);

    try {
      const result = await getPdfByRollNo(searchRollNo);

      if (!result.data || !result.data.pdfFile) {
        setSearchError("No PDF found for this roll number");
        return;
      }

      setViewerPdfUrl(getPdfUrl(result.data.pdfFile));
    } catch (err) {
      setSearchError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>PDF Registration System</h1>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register PDF
        </button>
        <button
          className={`tab ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View Registered PDF
        </button>
      </div>

      {/* Registration Tab */}
      {activeTab === "register" && (
        <div className="tab-content">
          {!success ? (
            <form onSubmit={handleSubmit} className="form">
              <h2>Register New PDF</h2>
              <div className="form-group">
                <label htmlFor="rollNo">Roll Number:</label>
                <input
                  type="text"
                  id="rollNo"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="Enter your roll number"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pdfFile">PDF File:</label>
                <input
                  type="file"
                  id="pdfFile"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="application/pdf"
                  disabled={loading}
                />
                {file && <p className="selected-file">Selected: {file.name}</p>}
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Uploading..." : "Register"}
              </button>
            </form>
          ) : (
            <div className="success-container">
              <div className="success-message">
                <h2>Registration Successful!</h2>
                <p>
                  Your PDF has been registered successfully for roll number:{" "}
                  {rollNo}
                </p>
              </div>

              {pdfUrl && (
                <div className="pdf-viewer">
                  <h3>PDF Preview</h3>
                  <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    width="100%"
                    height="500px"
                  />
                </div>
              )}

              <button onClick={resetForm} className="reset-btn">
                Register Another PDF
              </button>
            </div>
          )}
        </div>
      )}

      {/* View PDF Tab */}
      {activeTab === "view" && (
        <div className="tab-content">
          <div className="form">
            <h2>View Registered PDF</h2>
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-group">
                <label htmlFor="searchRollNo">Enter Roll Number:</label>
                <input
                  type="text"
                  id="searchRollNo"
                  value={searchRollNo}
                  onChange={(e) => setSearchRollNo(e.target.value)}
                  placeholder="Enter roll number to find PDF"
                  disabled={searchLoading}
                />
              </div>

              {searchError && (
                <div className="error-message">{searchError}</div>
              )}

              <button
                type="submit"
                disabled={searchLoading}
                className="submit-btn"
              >
                {searchLoading ? "Searching..." : "Search PDF"}
              </button>
            </form>

            {viewerPdfUrl && (
              <div className="pdf-viewer">
                <h3>Registered PDF for Roll Number: {searchRollNo}</h3>
                <iframe
                  src={viewerPdfUrl}
                  title="PDF Viewer"
                  width="100%"
                  height="500px"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
