import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";

// Ensure workerSrc is set
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfCompProps {
  pdfFile: string | null;
  onLoadSuccess: (numPages: number) => void; // New prop for onLoadSuccess callback
}

function PdfComp({ pdfFile, onLoadSuccess }: PdfCompProps): JSX.Element {
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    if (pdfFile) {
      // Load the PDF document
      pdfjs.getDocument(pdfFile).promise.then((pdf) => {
        // Set the number of pages
        setNumPages(pdf.numPages);
        onLoadSuccess(pdf.numPages); // Call the callback with the number of pages
      }).catch((error) => {
        console.error("Error loading PDF:", error);
      });
    } else {
      setNumPages(null);
    }
  }, [pdfFile, onLoadSuccess]);

  return (
    <div className="inset-0">
      <p>
        {numPages !== null ? numPages : "Loading..."}
      </p>
    </div>
  );
}

export default PdfComp;
