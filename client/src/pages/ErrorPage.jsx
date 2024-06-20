import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-6xl mb-8">404</h1>
          <h3 className="text-2xl text-center">
            Some error occurred.{" "}
            <Link to="/" className="underline">
              Navigate to home.
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}
