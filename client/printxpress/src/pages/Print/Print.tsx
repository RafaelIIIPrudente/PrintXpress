import React, { useState } from "react";
import Navbar from "../../pages/components/HomeNavbar";
import backgroundImage from "../../assets/bg.png";
import printPNG from "../../assets/print.png";
import grayscale from "../../assets/grayscale.png";
import colored from "../../assets/colored.png";
import pricing from "../../assets/smart-pricing.png";

import PdfComp from "../Upload/pdfComp";
import PdfPages from "../Upload/pdfPage";
import Modal from "../components/Modal";

import axios from "axios";
import { useEffect } from "react";


// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

const Print2: React.FC = () => {
  const [printer] = useState("EPSON L360 Series");
  const [monochrome, setMonochrome] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isColored, setIsColored] = useState(false);
  const [showSmartPricing, setShowSmartPricing] = useState(false); // State to control the visibility of smart pricing section
  const [paperSize] = useState("letter");
  const [scale] = useState("fit");

  const [printOption, setPrintOption] = useState("1");
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [numOfCopies, setNumOfCopies] = useState(1);
  const [pages, setPages] = useState("");
  const [fileName, setFileName] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState<PdfData[] | null>(null); // State to store the list of uploaded files
  const [selectedPdf, setSelectedPdf] = useState<string>(""); // State to store the selected PDF file
  const [pdfPrint, setPdfPrint] = useState<string>(""); // State to store the selected PDF file
  const [totalPages, setTotalPages] = useState<number>(0);
  const [printPrice, setPrintPrice] = useState<number>(0);
  const [showPrintButton, setShowPrintButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [latestValue, setLatestValue] = useState<number>(0);

  useEffect(() => {
    const fetchLatestValue = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-serial-data');
        if (response.ok) {
          const data = await response.json();
          setLatestValue(data.latestValue);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    // Fetch the latest value every second
    const intervalId = setInterval(fetchLatestValue, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const resetLatestValue = () => {
    setLatestValue(0);
    setShowPrintButton(false);

    // Optionally, send a request to the backend to log the reset action
    fetch('http://localhost:5000/reset-serial-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latestValue: 0 })
    }).catch(error => {
      console.error('Error resetting data:', error);
    });
  };


  const handleSubmit = async () => {
    try {
      // Send POST request to /print-pdf endpoint
      const response = await axios.post("http://localhost:5000/print-pdf", {
        pdfFilePath: pdfPrint,
        printer: printer,
        pages: pages,
        monochrome: monochrome,
        copies: numOfCopies,
        paperSize: paperSize,
        scale: scale,
      });
      console.log(response.data);
      // Close the modal
    setIsModalOpen(false);
    resetLatestValue();

    // Delay redirection to home page by 5 seconds
    setTimeout(() => {
      window.location.href = "/"; // Redirect to the home page
    }, 5000);

    } catch (error) {
      console.error("Error printing PDF:", error);
    }
  };

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
        setFileName(selected.replace(/^\d+-\d+/, ''));
        console.log("Selected PDF:", selectedPdf.replace(/\//g, '\\'));
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const handlePrintOptionChange = (option: string) => {
    setPrintOption(option);
    if (option === "allPages") {
      setPages(`1-${totalPages}`);
    } else if (option === "specific") {
      setPages(`${fromPage}-${toPage}`);
    } else {
      setPages("");
    }
  };

  const handleLoadSuccess = async (numPages: number) => {
    setTotalPages(numPages);
    // setPages(`1-${numPages}`);
  };


  const handleIncrement = (type: string) => {
    if (type === "from" && fromPage < toPage) { // Check if fromPage is less than toPage
      setFromPage(fromPage + 1);
      if (printOption === "specific") {
        setPages(`${fromPage + 1}-${toPage}`);
      }
    } else if (type === "to" && toPage < totalPages) { // Check if toPage is less than totalPages
      setToPage(toPage + 1);
      if (printOption === "specific") {
        setPages(`${fromPage}-${toPage + 1}`);
      }
    } else if (type === "copies") {
      setNumOfCopies(numOfCopies + 1);
    }
  };

  const handleDecrement = (type: string) => {
    if (type === "from" && fromPage > 1) {
      setFromPage(fromPage - 1);
      if (printOption === "specific") {
        setPages(`${fromPage - 1}-${toPage}`);
        console.log("Pages:", pages);
      }
    } else if (type === "to" && toPage > 1) {
      setToPage(toPage - 1);
      if (printOption === "specific") {
        setPages(`${fromPage}-${toPage - 1}`);
        console.log("Pages:", pages);
      }
    } else if (type === "copies" && numOfCopies > 1) {
      setNumOfCopies(numOfCopies - 1);
    }
  };

  // Function to handle grayscale button click
  const handleGrayscaleClick = () => {
    setMonochrome(true);
    setIsGrayscale(true);
    setIsColored(false);
  };

  // Function to handle colored button click
  const handleColoredClick = () => {
    setMonochrome(false);
    setIsGrayscale(false);
    setIsColored(true);
  };


  const handleSmartPricingClick = () => {
    setShowSmartPricing(true); // Show smart pricing section when the button is clicked
  };

  const handlePrintClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const smartPricing = () => {

    try {
      const pricePerPage = 4; // Define the price per page

      const pagesString = pages;
      const pagesArray = pagesString.split("-");
      const startPage = parseInt(pagesArray[0], 10); // Convert the start page to a number
      const endPage = parseInt(pagesArray[1], 10); // Convert the end page to a number

      const paperPages = (endPage - startPage) + 1
      // Calculate the total price
      const totalPrice = (paperPages * numOfCopies) * pricePerPage;
      setPrintPrice(totalPrice);
      
      console.log('Total Price:', totalPrice);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

//   // Assuming you have a function to update the coin state based on the data received from the coin slot
// const updateCoinAmount = (newCoinAmount:number) => {
//   setCoin(newCoinAmount);
// };

// // Call the function whenever new data is received from the coin slot
// updateCoinAmount(coin);

useEffect(() => {
  // Function to check print button visibility
  const checkPrintButtonVisibility = () => {
    if (latestValue === null || latestValue < printPrice) {
      setShowPrintButton(false);
    } else {
      setShowPrintButton(true);
    }
  };

  // Interval to check print button visibility every 2 seconds
  const intervalId = setInterval(checkPrintButtonVisibility, 2000);

  // Cleanup function to clear the interval on component unmount
  return () => clearInterval(intervalId);
}, [latestValue, printPrice]);

  return (
    <div
      className="bg-cover bg-center h-screen min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <Navbar />
        <div className="mt-8 flex items-center justify-center mx-20">
          <div className="pr-40">
            <div className="text-xl ml-1 text-left mb-1"> Preview: </div>
            <div className="border rounded-lg w-[550px] h-[550px] bg-white">
              <div className="">
                <PdfComp pdfFile={selectedPdf} />
              </div>
            </div>
          </div>

          <div className="">
            <div className="text-center text-[40px] font-semibold">
              Print<span className="text-yellow-500">X</span>press
            </div>
            <div className="border rounded-lg w-[380px] h-[480px] bg-white p-4">
              <div className="flex mb-2 text-lg mt-4">
                <div className="text-left font-semibold mr-11">File Name: </div>
                <div className="text-right">{fileName}</div>
              </div>
              <div className="flex mb-2 text-lg">
                <div className="text-left font-semibold mr-8">Total Pages:</div>
                <div className="text-left">
                  <PdfPages pdfFile={selectedPdf} onLoadSuccess={handleLoadSuccess} />
                </div>
              </div>
             
              {!showSmartPricing && (
              <div className="flex text-lg">   
                <div className="text-left font-semibold">Pages to Print: </div>
                <div className="flex flex-col">
                  <div className="flex ml-3">
                    <input
                      type="radio"
                      id="allPages"
                      name="printOption"
                      value="allPages"
                      onChange={() => handlePrintOptionChange("allPages")}
                      className="mr-1"
                    />
                    <label htmlFor="allPages" className="ml-2">
                      All Pages
                    </label>
                  </div>

                  <div className="flex ml-3">
                    <input
                      type="radio"
                      id="specificPages"
                      name="printOption"
                      value="specific"
                      checked={printOption === "specific"}
                      onChange={() => handlePrintOptionChange("specific")}
                      className="mr-1"
                    />
                    <label htmlFor="specificPages" className="ml-2">
                      Specific Pages
                    </label>
                  </div>
                </div>
              </div>
              )}
              
              {printOption === "specific" && !showSmartPricing && (
                <>
                  <div className="flex items-center mt-2">
                    <div className="text-left pl-40"> From: </div>
                    <div className="flex items-center ml-2">
                      <div>{fromPage}</div>
                      <button
                        className="ml-2 rounded-full bg-red-500 px-2 text-white"
                        onClick={() => handleDecrement("from")}
                      >
                        -
                      </button>
                      <button
                        className="ml-2 rounded-full bg-blue-500 px-2 text-white"
                        onClick={() => handleIncrement("from")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="text-left pl-40"> To: </div>
                    <div className="flex items-center ml-7">
                      <div>{toPage}</div>
                      <button
                        className="ml-2 rounded-full bg-red-500 px-2 text-white"
                        onClick={() => handleDecrement("to")}
                      >
                        -
                      </button>
                      <button
                        className="ml-2 rounded-full bg-blue-500 px-2 text-white"
                        onClick={() => handleIncrement("to")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
              {!showSmartPricing && (
                <div className="flex items-center mt-8">
                  <div className="text-left text-lg font-semibold">
                    Number of Copies:
                  </div>
                  <div className="flex items-center ml-4">
                    <div className="mr-8">{numOfCopies}</div>
                    <button
                      className="ml-2 rounded-full bg-red-500 px-2 text-white"
                      onClick={() => handleDecrement("copies")}
                    >
                      -
                    </button>
                    <button
                      className="ml-2 rounded-full bg-blue-500 px-2 text-white"
                      onClick={() => handleIncrement("copies")}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center mt-4">
                {!showSmartPricing && (
                  <button className={`hover:bg-gray-200 mb-3 mr-2 border border-gray-600 w-[250px] py-2 rounded-2xl ${isGrayscale ? 'bg-gray-200' : ''
                    }`} onClick={handleGrayscaleClick}>
                    <div className="flex items-center justify-center">
                      <img
                        src={grayscale}
                        alt="grayscale"
                        className="w-6 h-6 "
                      ></img>
                      Grayscale
                    </div>
                  </button>
                )}

                {!showSmartPricing && (
                  <button className={`hover:bg-orange-400 mb-3 mr-2 border border-gray-600 w-[250px] py-2 rounded-2xl ${isColored ? 'bg-orange-400' : ''
                    }`} onClick={handleColoredClick}>
                    <div className="flex items-center justify-center">
                      <img
                        src={colored}
                        alt="colored"
                        className="w-6 h-6 mr-2"
                      ></img>
                      Colored
                    </div>
                  </button>
                )}
                {!showSmartPricing && (
                  <button className="bg-gray-300 hover:bg-gray-400 mb-3 mr-2 border border-gray-600 w-[250px] py-2 rounded-2xl" onClick={handleSmartPricingClick}>
                    <div className="flex items-center justify-center">
                      <img src={pricing} alt="smart-pricing" className="w-5 h-5 mr-2"></img>
                      Smart Pricing
                    </div>
                  </button>
                )}

                {showSmartPricing && (
                  <div>
                     <div className="text-left font-semibold">Pages to Print: {pages} </div> 
                     <div className="text-left font-semibold">Number of Copies: {numOfCopies} </div> 
                    <div className="mt-2 border border-gray-800 w-[300px] h-[100px] mx-auto rounded-lg" onClick={smartPricing}>
                      <div className="ml-2 mt-2 text-left"> To pay:</div>
                      <div className="ml-2 mt-2 text-center mr-4 text-4xl">{printPrice}.00<span className="text-2xl"> PHP </span></div>
                    </div>
                    <div className="mt-2 border border-gray-800 w-[300px] h-[100px] mx-auto rounded-lg">
                      <div className="ml-2 mt-2 text-left"> Inserted Coins:</div>
                      <div className="ml-2 mt-2 text-center mr-4 text-4xl text-red-500">{latestValue}.00<span className="text-2xl text-black"> PHP </span></div>
                    </div>
                  </div>
                )}

                {showPrintButton && (
                  <button className="mt-4 border border-gray-800 rounded-full full w-[300px] bg-white py-3 mb-12 hover:bg-gray-300" onClick={handlePrintClick}>
                    <div className="flex items-end justify-center text-2xl font-semibold">
                      <img src={printPNG} alt="print" className="w-8 h-7 mr-5" />
                      PRINT
                    </div>
                  </button>
                )}
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                
                {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="relative bg-yellow-100 w-96 rounded-lg shadow-2xl p-6 py-12 border border-gray-600">
                      <h2 className="text-2xl font-semibold mb-4">Print Document?</h2>

                      <div className="flex justify-center">
                        <button
                          onClick={handleSubmit}
                          className="bg-white hover:bg-green-200 font-bold py-2 px-4 mr-4 rounded-full border border-green-600 text-green-600 w-[150px]"
                        >
                          Yes
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-white hover:bg-red-200 font-bold py-2 px-4 mr-4 rounded-full border border-red-400 text-red-500 w-[150px]"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print2;