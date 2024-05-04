import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfComp from "../Upload/pdfComp";

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

const Print: React.FC = () => {
  // const [pdfFilePath] = useState("C:\\Users\\PC\\Downloads\\postings.pdf");

  const [uploadedFiles, setUploadedFiles] = useState<PdfData[] | null>(null); // State to store the list of uploaded files
  const [selectedPdf, setSelectedPdf] = useState<string>(""); // State to store the selected PDF file
  const [printer] = useState("EPSON L3110 Series (Copy 2)");
  const [pages, setPages] = useState('');
  const [monochrome, setMonochrome] = useState(false);
  const [copies, setCopies] = useState(1);
  const [paperSize] = useState('letter');
  const [scale] = useState('shrink');

  // Fetch the list of uploaded PDF files when the component mounts
  useEffect(() => {
    fetchUploadedFiles();
  }, []); // Pass an empty dependency array to run the effect only once
  
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
        const selected = response.data.data[0].pdf
        setSelectedPdf(response.data.data[0].pdf);
        console.log("Selected PDF:", selectedPdf);
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  // Function to handle the form submission
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
        scale: scale
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };

  const smartPricing = async () => {
    const pricePerPage = 3; // Define the price per page

    try {
      // Check if there are uploaded files
      if (uploadedFiles && uploadedFiles.length > 0) {
        // Get the latest uploaded PDF data

        const totalPages = parseInt(pages);

        // Calculate the total price
        const totalPrice = totalPages * copies * pricePerPage;

        console.log('Total Pages:', totalPages);
        console.log('Copies:', copies);
        console.log('Total Price:', totalPrice);
      } else {
        console.log('No uploaded files found.');
      }
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };



  return (

    <div>
      <PdfComp pdfFile={selectedPdf} />
      
      {/* <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {uploadedFiles && Array.isArray(uploadedFiles) && uploadedFiles.map((data: PdfData) => (
            setSelectedPdf(data.pdf), <PdfComp pdfFile={`http://localhost:5000/files/${data.pdf}`} />
          ))}
        </div>
      </div> */}

      {/* <label>
        Printer:
        <input type="text" value={printer} onChange={(e) => setPrinter(e.target.value)} />
      </label> */}
      <br />
      <label>
        Pages:
        <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} />
      </label>
      <br />
      <label>
        Monochrome:
        <input type="checkbox" checked={monochrome} onChange={(e) => setMonochrome(e.target.checked)} />
      </label>
      <br />
      <label>
        Copies:
        <input type="number" value={copies} onChange={(e) => setCopies(parseInt(e.target.value))} />
      </label>
      <br />
      {/* <label>
        Paper Size:
        <input type="text" value={paperSize} onChange={(e) => setPaperSize(e.target.value)} />
      </label> */}
      <br />
      {/* <label>
        Scale:
        <input type="text" value={scale} onChange={(e) => setScale(e.target.value)} />
      </label> */}
      <br />
      <label>
        <button onClick={smartPricing}>Calculate</button>
      </label>
      <br />
      <button onClick={handleSubmit}>Print PDF</button>

    </div>
  );
}

export default Print;