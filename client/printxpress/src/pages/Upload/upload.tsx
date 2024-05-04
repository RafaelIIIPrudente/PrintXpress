import Navbar from "../../components/Navbar";
import backgroundImage from "../../assets/bg.png";
import qr from "../../assets/qr.png";

const Upload = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <Navbar />
        <div className="flex items-center justify-center mt-16 px-12">
          <div className="mr-16">
            <img src={qr} alt="qr" className="w-80 h-80" />
            <div className="text-2xl font-semibold"> Scan Me </div>
            <div className="text-2xl font-light">or log in to 192.168.1.1</div>
          </div>

          <div className="border rounded-lg w-[900px] h-[500px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
