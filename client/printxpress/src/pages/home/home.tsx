import NavBar from './Navbar';
import { Button } from "@nextui-org/react";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen w-screen px-5 py-5">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-large font-bold">Welcome to PrintXpress</h1>
          <p className="text-lg">Your one stop shop for all your printing needs</p>

          <Button href="google.com" color="primary" variant="flat">
            Print
          </Button>
        </div>
      </div>
    </>
  )
}

export default Home;