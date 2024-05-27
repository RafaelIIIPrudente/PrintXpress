import Navbar from "../components/HomeNavbar";
import backgroundImage from "../../assets/bg.png";
import pdf from "../../assets/pdf.png";
import sample from "../../assets/sample-pdf.png";
import { Link } from "react-router-dom";

const Upload = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <Navbar />
        <div className="flex items-center justify-center mt-16 px-12 relative">
          <div className="mr-16">
            <div className="w-80 h-80 bg-white">
              <div className="text-center text-[40px] font-semibold">
                Print<span className="text-yellow-500">X</span>press
              </div>
            </div>
            <div className="text-2xl font-semibold mt-2"> Scan Me </div>
            <div className="text-2xl font-light mt-1">
              or log in to 192.168.1.1
            </div>
          </div>
          <div className="border rounded-lg w-[900px] h-[500px] bg-white relative">
            <img
              src={pdf}
              alt="pdf"
              className="absolute top-0 right-0 -mt-10 mr-4 w-20 h-20"
            />
            {/* //sample pdf lang para ma link pero diri ang pdf dapat nga uploaded*/}
            <Link to="/print">
              <img src={sample} alt="pdf" className="w-28 h-28 px-4 py-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;