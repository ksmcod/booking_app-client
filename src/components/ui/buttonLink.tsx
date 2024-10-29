import { Link } from "react-router-dom";

interface LinkProps {
  target: string;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonLink({ target, className, children }: LinkProps) {
  return (
    <Link
      to={target}
      className={`text-white text-center px-4 py-2 rounded font-bold bg-blue-600 hover:bg-blue-500
        ${className}
        `}
    >
      {children}
    </Link>
  );
}
