import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfComp from "../Upload/pdfComp";

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

const Print2: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<PdfData[] | null>(null); // State to store the list of uploaded files
  const [selectedPdf, setSelectedPdf] = useState<string>("C:\\Users\\PC\\Downloads\\postings.pdf"); // State to store the selected PDF file
  const [printer] = useState("EPSON L3110 Series (Copy 2)");
  const [pages, setPages] = useState("");
  const [monochrome, setMonochrome] = useState(false);
  const [copies, setCopies] = useState(1);
  const [paperSize] = useState("letter");
  const [scale] = useState("shrink");

  // Fetch the list of uploaded PDF files when the component mounts
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  // Function to fetch the list of uploaded PDF files
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get<{ data: PdfData[] }>(
        "http://localhost:5000/get-all-files"
      );
      setUploadedFiles(response.data.data);
      console.log("Uploaded Files:", uploadedFiles);

      // Set the selected PDF to the first uploaded PDF, if available
      if (response.data.data && response.data.data.length > 0) {
        const  pageNumber = response.data.data.length;
        const selected = response.data.data[pageNumber - 1].pdf;
        setSelectedPdf(`http://localhost:5000/files/${selected}`)
        console.log("Selected PDF:", selectedPdf);
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Send POST request to /print-pdf endpoint
      const response = await axios.post("http://localhost:5000/print-pdf", {
        pdfFilePath: selectedPdf,
        printer: printer,
        pages: pages,
        monochrome: monochrome,
        copies: copies,
        paperSize: paperSize,
        scale: scale,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error printing PDF:", error);
    }
  };

  return (
    <div>
      <PdfComp pdfFile={selectedPdf}/>

      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {uploadedFiles == null ? "" : uploadedFiles.map((data: PdfData) => (
            <div className="inner-div" key={data.pdf}>
              <h6>Title: {data.title}</h6>
              <h6>PDF: {data.pdf}</h6>
            </div>
          ))}
        </div>
      </div>

      <br />
      
      <label>
        Pages:
        <input
          type="text"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </label>
      <br />
      <label>
        Monochrome:
        <input
          type="checkbox"
          checked={monochrome}
          onChange={(e) => setMonochrome(e.target.checked)}
        />
      </label>
      <br />
      <label>
        Copies:
        <input
          type="number"
          value={copies}
          onChange={(e) => setCopies(parseInt(e.target.value))}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Print PDF</button>
    </div>
  );
};

export default Print2;
