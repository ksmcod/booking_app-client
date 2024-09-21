import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-4xl text-white font-bold tracking-tight">
          <Link to={"/"}>Bookup</Link>
        </span>

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
