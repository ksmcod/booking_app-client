import { Link } from "react-router-dom";

interface LinkProps {
  target: string;
  label: string;
}

export default function ButtonLink({ target, label }: LinkProps) {
  return (
    <Link
      to={target}
      className="text-white px-4 py-2 rounded font-bold bg-blue-600 hover:bg-blue-500"
    >
      {label}
    </Link>
  );
}
