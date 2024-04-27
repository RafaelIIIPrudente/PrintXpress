import { useState } from "react";
import { Document, Page } from "react-pdf";


// Interface for PDF component props
interface PdfCompProps {
  pdfFile: string | null; // Adjusted to accept string or null
}

// PDF component
function PdfComp(props: PdfCompProps): JSX.Element {
  // State to store number of pages
  const [numPages, setNumPages] = useState<number | null>(null);
  // State to store current page number
  const [pageNumber] = useState(1);

  // Function to set number of pages
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    // Set number of pages
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
      // Display page number
      <p>
        Page {pageNumber} of {numPages}
      </p>
      // Display PDF
      <Document file={props.pdfFile || ""} onLoadSuccess={onDocumentLoadSuccess}>
        // Display pages
        {Array.from(new Array(numPages || 0), (x, i) => i + 1).map((page) => (
          <Page key={page} pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
        ))}
      </Document>
    </div>
  );
}

export default PdfComp;
