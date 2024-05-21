import logo from "../../assets/logo.png";
import cpuLogo from "../../assets/cpu-logo.png"

const HomeNavbar = () => {
  // Get current date and time
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date string
  const currentDateString = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-24 w-24 mr-2" />
      </div>

      <div className="text-center">
        <p className="text-2xl pl-52">{currentTime}</p>
        <p className="text-xl pl-52">{currentDateString}</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-right mr-2">
          <p className="text-lg">Central Philippine University</p>
          <p className="text-base">College of Engineering</p>
        </div>

        <img src={cpuLogo} alt="Logo" className="h-20 w-20 mr-2 mx-auto" />
      </div>
    </div>
  );
};

export default HomeNavbar;