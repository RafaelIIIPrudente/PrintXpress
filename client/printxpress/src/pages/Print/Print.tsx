import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfComp from "../Upload/pdfComp";

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

const Print: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<PdfData[] | null>(null); // State to store the list of uploaded files
  const [selectedPdf, setSelectedPdf] = useState<string>(""); // State to store the selected PDF file
  const [pdfPrint,setPdfPrint] = useState<string>(""); // State to store the selected PDF file
  const [printer] = useState("EPSON L360 Series");
  const [pages, setPages] = useState("");
  const [monochrome, setMonochrome] = useState(false);
  const [copies, setCopies] = useState(1);
  const [paperSize] = useState("letter");
  const [scale] = useState("fit");

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
        const pageNumber = response.data.data.length;
        const selected = response.data.data[pageNumber - 1].pdf;

        // const pdf = selected.replace(/\//g, '\\');

        setPdfPrint(`D:\\Documents\\Rafael III Prudente\\College Files\\Third Year\\Second Semester\\Techno\\PrintXpress\\PrintXpress\\server\\files\\${selected}`);
        console.log("PDF to Print:", pdfPrint);

        console.log("Selected PDF:", selectedPdf);
        setSelectedPdf(`http://localhost:5000/files/${selected}`)
        console.log("Selected PDF:", selectedPdf.replace(/\//g, '\\'));
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const smartPricing = async () => {
   
    try {
      const pricePerPage = 4; // Define the price per page
        const totalPages = calculateTotalPages(pages); // Calculate the total pages

        // Calculate the total price
        const totalPrice = (totalPages * copies) * pricePerPage;

        console.log('Total Pages:', totalPages);
        console.log('Price Per Page:', pricePerPage)
        console.log('Copies:', copies);
        console.log('Total Price:', totalPrice);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  const calculateTotalPages = (pagesInput: string): number => {
    // Split the input by '-' to get the start and end page numbers
    const [startPage, endPage] = pagesInput.split('-').map(page => parseInt(page.trim()));
  
    // Calculate the total pages
    const totalPages = endPage - startPage + 1;
  
    return totalPages;
  };
  

  const handleSubmit = async () => {
    try {
      // Send POST request to /print-pdf endpoint
      const response = await axios.post("http://localhost:5000/print-pdf", {
        pdfFilePath: pdfPrint,
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
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
      </div>

      <PdfComp pdfFile={selectedPdf} />

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
      <br />
      <button onClick={smartPricing}>Calculate</button>
    </div>
  );
};

export default Print;

