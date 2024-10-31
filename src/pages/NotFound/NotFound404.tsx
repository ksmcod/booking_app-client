import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="">
        <h1 className="text-9xl text-center">404</h1>
        <div>
          This page does not exist!{" "}
          <Link to={"/"} className="link hover:text-blue-600" replace>
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
