import { Link } from "react-router-dom";
import HomeNavbar from "../../components/HomeNavbar";
import print from "../../assets/print-icon.png";
import backgroundImage from "../../assets/bg.png";

const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <HomeNavbar />
        <div className="text-center text-[60px]"> WELCOME to</div>
        <div className="text-center text-[110px] font-semibold">
          Print<span className="text-yellow-500">X</span>press
        </div>
        <div className="text-center text-[35px] font-light mb-8">
          Choose your Service
        </div>

        <Link to="/upload" className="">
          <img
            src={print}
            alt="Logo"
            className="mt-4 h-36 w-66 inline-block hover:h-40 hover:w-72"
          />
        </Link>

        <div className="text-5xl font-semibold"> PRINT </div>
      </div>
    </div>
  );
};

export default Home;
