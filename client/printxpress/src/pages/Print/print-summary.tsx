import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import backgroundImage from "../../assets/bg.png";
import logo from "../../assets/logo.png";
import print from "../../assets/print.png";
import Modal from "../../components/Modal";

const PrintSummary: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrintClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <Navbar />
        <div className="mt-2 flex items-center justify-center mx-20">
          <div className="pr-40 mb-12">
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
              <div className="text-center font-medium text-4xl"> SUMMARY</div>

              <div className="flex mb-2 text-lg mt-4 ml-6">
                <div className="text-left font-semibold mr-20">File Name: </div>
                <div className="text-right"> rap.pdf</div>
              </div>
              <div className="flex mb-2 text-lg mt-3 ml-6">
                <div className="text-left font-semibold mr-8">
                  Page(s) to Print:
                </div>
                <div className="text-left"> 2 </div>
              </div>

              <div className="flex mb-2 text-lg ml-6">
                <div className="text-left font-semibold mr-[105px]">
                  Copies:
                </div>
                <div className="text-left"> 2 </div>
              </div>

              <div className="flex mb-2 text-lg ml-6">
                <div className="text-left font-semibold mr-[105px]">
                  Output:
                </div>
                <div className="text-left"> Smart Pricing </div>
              </div>

              <div className="mt-4 border border-gray-800 w-[300px] h-[100px] mx-auto rounded-lg">
                <div className="ml-2 mt-2 text-left"> To pay:</div>
                <div className="ml-2 mt-2 text-center mr-4 text-4xl">
                  10.00
                  <span className="text-2xl"> PHP </span>
                </div>
              </div>
              <div className="mt-4 border border-gray-800 w-[300px] h-[100px] mx-auto rounded-lg">
                <div className="ml-2 mt-2 text-left"> Inserted Coins:</div>
                <div className="ml-2 mt-2 text-center mr-4 text-4xl text-red-500">
                  0.00
                  <span className="text-2xl text-black"> PHP </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePrintClick}
              className="mt-4 border border-gray-800 rounded-full full w-[300px] bg-white py-3 mb-12 hover:bg-gray-300"
            >
              <div className="flex items-end justify-center text-2xl font-semibold">
                <img src={print} alt="print" className="w-8 h-7 mr-5" />
                PRINT
              </div>
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSummary;
