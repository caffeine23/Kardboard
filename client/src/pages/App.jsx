import Navbar from "../components/Navbar";
import Boards from "../components/Boards";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center mt-4">
          <Heading className="text-center">Your boards</Heading>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <Boards />
        </div>
      </div>
    </>
  );
}

export default App;
