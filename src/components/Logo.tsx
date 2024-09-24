import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to={"/"}
      className="logo text-4xl text-white tracking-tight font-bold underline underline-offset-8"
    >
      Trippr
    </Link>
  );
}
