import React, { useState, useEffect} from "react";
import Navbar from "../../components/Navbar";
import backgroundImage from "../../assets/bg.png";
// import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import grayscale from "../../assets/grayscale.png";
import colored from "../../assets/colored.png";
import pricing from "../../assets/smart-pricing.png";
import axios from "axios";
import PdfComp from "../Upload/pdfComp";

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

const Print: React.FC = () => {
  const [printOption, setPrintOption] = useState("all");
  const [pdfPrint,setPdfPrint] = useState<string>(""); // State to store the selected PDF file
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [numOfCopies, setNumOfCopies] = useState(1);
  const [selectedPdf, setSelectedPdf] = useState<string>(""); // State to store the selected PDF file
  const [uploadedFiles, setUploadedFiles] = useState<PdfData[] | null>(null); // State to store the list of uploaded files


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

  const handlePrintOptionChange = (option: string) => {
    setPrintOption(option);
  };

  const handleIncrement = (type: string) => {
    if (type === "from") {
      setFromPage(fromPage + 1);
    } else if (type === "to") {
      setToPage(toPage + 1);
    } else if (type === "copies") {
      setNumOfCopies(numOfCopies + 1);
    }
  };

  const handleDecrement = (type: string) => {
    if (type === "from" && fromPage > 1) {
      setFromPage(fromPage - 1);
    } else if (type === "to" && toPage > 1) {
      setToPage(toPage - 1);
    } else if (type === "copies" && numOfCopies > 1) {
      setNumOfCopies(numOfCopies - 1);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <Navbar />
        <div className="mt-8 flex items-center justify-center mx-20">
          <div className="pr-40">
            <div className="text-xl ml-1 text-left mb-1"> Preview: </div>
            <div className="border rounded-lg w-[550px] h-[550px] bg-white">
              {/* sample sa sulod, preview nadi sang pdf */}
              <PdfComp pdfFile={selectedPdf} />

            </div>
          </div>

          <div className="">
            <div className="text-center text-[40px] font-semibold">
              Print<span className="text-yellow-500">X</span>press
            </div>
            <div className="border rounded-lg w-[380px] h-[480px] bg-white p-4">
              <div className="flex mb-2 text-lg mt-4">
                <div className="text-left font-semibold mr-11">File Name: </div>
                <div className="text-right"> rap.pdf</div>
              </div>
              <div className="flex mb-2 text-lg">
                <div className="text-left font-semibold mr-8">Total Pages:</div>
                <div className="text-left"> 2 </div>
              </div>
              <div className="flex text-lg">
                <div className="text-left font-semibold">Pages to Print: </div>
                <div className="flex flex-col">
                  <div className="flex ml-3">
                    <input
                      type="radio"
                      id="allPages"
                      name="printOption"
                      value="all"
                      checked={printOption === "all"}
                      onChange={() => handlePrintOptionChange("all")}
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
              {printOption === "specific" && (
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

              <div className="flex flex-col items-center mt-4">
                <button className="hover:bg-gray-200 mb-3 mr-2 border border-gray-600 w-[250px] py-2  rounded-2xl">
                  <div className="flex items-center justify-center">
                    <img
                      src={grayscale}
                      alt="grayscale"
                      className="w-6 h-6 "
                    ></img>
                    Grayscale
                  </div>
                </button>
                <button className="hover:bg-orange-400 mb-3 mr-2 border border-gray-600 w-[250px] py-2  rounded-2xl">
                  <div className="flex items-center justify-center">
                    <img
                      src={colored}
                      alt="colored"
                      className="w-6 h-6 mr-2"
                    ></img>
                    Colored
                  </div>
                </button>

                <Link to="/print-summary">
                  <button className="bg-gray-300 hover:bg-gray-400 mb-3 mr-2 border border-gray-600 w-[250px] py-2  rounded-2xl">
                    <div className="flex items-center justify-center">
                      <img
                        src={pricing}
                        alt="smart-pricing"
                        className="w-5 h-5 mr-2"
                      ></img>
                      Smart Pricing
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;
