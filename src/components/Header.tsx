import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="bg-blue-800 py-5">
      <div className="container mx-auto flex justify-between">
        <Logo />

        <span className="flex space-x-2">
          <Link
            to={"/login"}
            className="flex items-center justify-center text-blue-600 px-6 rounded-sm font-bold bg-white hover:bg-gray-100"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
