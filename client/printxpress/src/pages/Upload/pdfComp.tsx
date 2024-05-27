import { useState } from "react";
import { Document, Page } from "react-pdf";
// Interface for PDF component props
interface PdfCompProps {
  pdfFile: string | null; // Adjusted to accept string or null
}

// PDF component
// PDF component
function PdfComp(props: PdfCompProps): JSX.Element {
  // State to store number of pages
  const [numPages, setNumPages] = useState<number | null>(null);

  // Function to set number of pages
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    // Set number of pages
    setNumPages(numPages);
  }

  return (
    <div className="inset-0">
      <Document file={props.pdfFile || ""} onLoadSuccess={onDocumentLoadSuccess}>
        {/* Only render the first page */}
        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <p>
        Page 1 of {numPages}
      </p>
    </div>
  );
}

export default PdfComp;
