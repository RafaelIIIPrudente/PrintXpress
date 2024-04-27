// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const PrintPDF: React.FC = () => {

  const handlePrint = () => {
    print();
  };
  // const [numCopies, setNumCopies] = useState<number>(1);
  // const [grayscale, setGrayscale] = useState<boolean>(false);
  // const [pages, setPages] = useState<string>('1');
  // const [printerName, setPrinterName] = useState<string>('');

//   useEffect(() => {
//     getPrinters()
//       .then((printer) => {
//         if (printer) {
//           setPrinterName(printerName);
//         } else {
//           console.log('No default printer found.');
//         }
//       })
//       .catch((error) => console.error('Error getting default printer:', error));
//  }, [printerName]);

//   const handlePrint = async () => {
//     try {
//       const pdfFilePath = 'https://github.com/RafaelIIIPrudente/PrintXpress/blob/main/server/files/1712322289721-379878601PSSE%20_%20Letter%20to%20Lambunao%20NHS.pdf'; // Corrected PDF file path

//       // Construct options object based on user preferences
//       const options = {
//         copies: numCopies,
//         monochrome: grayscale,
//         pages,
//       };

//       // Send POST request to backend server
//       await axios.post('http://localhost:5000/print-pdf', { pdfFilePath, options });

//       console.log('PDF printing request sent.');
//     } catch (error) {
//       console.error('Error sending printing request:', error);
//     }
//   };

  return (
    <div>
       <button onClick={handlePrint}>Print</button>

      {/* <div>
        <label htmlFor="numCopies">Number of Copies:</label>
        <input 
          type="number" 
          id="numCopies" 
          value={numCopies} 
          onChange={(e) => setNumCopies(parseInt(e.target.value))} 
        />
      </div>
      <div>
        <label htmlFor="grayscale">Grayscale:</label>
        <input 
          type="checkbox" 
          id="grayscale" 
          checked={grayscale} 
          onChange={(e) => setGrayscale(e.target.checked)} 
        />
      </div>
      <div>
        <label htmlFor="pages">Pages to Print:</label>
        <input 
          type="text" 
          id="pages" 
          value={pages} 
          onChange={(e) => setPages(e.target.value)} 
        />
      </div>
      <button onClick={handlePrint}>Print PDF</button> */}
    </div>
  );
};

export default PrintPDF;
