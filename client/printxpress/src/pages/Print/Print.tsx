import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import backgroundImage from "../../assets/bg.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Print: React.FC = () => {
  const [printOption, setPrintOption] = useState("all");
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [numOfCopies, setNumOfCopies] = useState(1);

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
              <img src={logo} alt="Logo" className="h-[550px] w-[550px] mr-2" />
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
                  Grayscale
                </button>
                <button className="hover:bg-orange-400 mb-3 mr-2 border border-gray-600 w-[250px] py-2  rounded-2xl">
                  Colored
                </button>

                <Link to="/print-summary">
                  <button className="bg-gray-400 hover:bg-gray-500 mb-3 mr-2 border border-gray-600 w-[250px] py-2  rounded-2xl">
                    Smart Pricing
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
