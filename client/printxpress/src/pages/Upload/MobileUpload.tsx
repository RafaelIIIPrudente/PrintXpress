import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import backgroundImage from "../../assets/bg.png";
import { Link } from "react-router-dom";

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

// Main component
function MobileUpload(): JSX.Element {
  // State to store title
  const [title, setTitle] = useState<string>("");
  // State to store file
  const [file, setFile] = useState<File | string>("");
  // State for upload status
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Upload PDF to server
  const uploadFile = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!title.trim()) {
      setUploadStatus("Please enter a title for your document");
      return;
    }
    
    if (!file || typeof file === "string") {
      setUploadStatus("Please select a PDF file");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://192.168.254.104:5000/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (result.data.status === "ok") {
        setUploadStatus("Upload successful! Your file has been added to the print queue.");
        // Reset form
        setTitle("");
        setFile("");
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload failed. Please check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus(""); // Clear any previous status
    }
  };

  // Handle title change
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
    setUploadStatus(""); // Clear any previous status
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md mx-auto pt-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <div className="text-3xl font-bold text-white">
              Print<span className="text-yellow-400">X</span>press
            </div>
          </Link>
          <div className="text-white text-lg">Mobile Upload</div>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              Upload Your PDF
            </div>
            <div className="text-gray-600">
              Scan the QR code at the kiosk to access this page
            </div>
          </div>

          <form onSubmit={uploadFile} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter document title"
                required
              />
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File *
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                accept="application/pdf"
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                Only PDF files are accepted
              </div>
            </div>

            {/* Upload Button */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isUploading ? "Uploading..." : "Upload PDF"}
            </button>
          </form>

          {/* Status Message */}
          {uploadStatus && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              uploadStatus.includes("successful") 
                ? "bg-green-100 text-green-800 border border-green-200"
                : uploadStatus.includes("Uploading")
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {uploadStatus}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-700">
              <div className="font-medium mb-2">How it works:</div>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Enter a title for your document</li>
                <li>Select your PDF file</li>
                <li>Click Upload to send to the print queue</li>
                <li>Go to the kiosk to print your document</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-white hover:text-yellow-400 transition-colors underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileUpload;
