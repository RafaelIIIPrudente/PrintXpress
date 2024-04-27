import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./pdfComp";

// Worker to parse PDFs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

// Main component
function App(): JSX.Element {
  // State to store title
  const [title, setTitle] = useState<string>("");
  // State to store file
  const [file, setFile] = useState<File | string>("");
  // State to store all PDFs
  const [allImage, setAllImage] = useState<PdfData[] | null>(null);
  // State to store PDF file
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  // Fetch PDFs on component mount
  useEffect(() => {
    getPdf();
  }, []);

  // Fetch PDFs from server
  const getPdf = async (): Promise<void> => {
    try {
      // Send GET request to server
      const result = await axios.get<{ data: PdfData[] }>(
        "http://localhost:5000/get-files"
      );
      console.log(result.data.data);
      // Set PDFs in state
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  // Upload PDF to server
  const uploadFile = async (e: FormEvent): Promise<void> => {
    // Prevent default form submission
    e.preventDefault();
    // Create form data
    const formData = new FormData();
    // Append title and file to form data
    formData.append("title", title);
    // Check if file is a string
    if (typeof file !== "string") {
      formData.append("file", file);
    }

    // Send POST request to server
    try {
      const result = await axios.post(
        "http://localhost:5000/upload-files",
        formData,
        {
          // Set content type to multipart form data
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      // Check if upload was successful
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        // Fetch PDFs
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Show PDF in PDF viewer
  const showPdf = (pdf: string): void => {
    setPdfFile(`http://localhost:5000/files/${pdf}`);
  };

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Check if file is selected
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Render
  return (
    <div className="App">
      <form className="formStyle" onSubmit={uploadFile}>
        <h1>Upload Pdf</h1>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={handleFileChange}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null ? "" : allImage.map((data: PdfData) => (
            <div className="inner-div" key={data.pdf}>
              <h6>Title: {data.title}</h6>
              <button className="btn btn-primary" onClick={() => showPdf(data.pdf)}>
                Show Pdf
              </button>
            </div>
          ))}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default App;
