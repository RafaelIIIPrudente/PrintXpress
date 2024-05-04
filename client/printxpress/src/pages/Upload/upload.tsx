import Navbar from "../../components/Navbar";
import backgroundImage from "../../assets/bg.png";
import pdf from "../../assets/pdf.png";
import qr from "../../assets/qr.png";

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
            <img src={qr} alt="qr" className="w-80 h-80" />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
