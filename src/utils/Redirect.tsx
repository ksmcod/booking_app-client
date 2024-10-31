import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NavigateProps {
  target: string;
}

export default function Redirect({ target }: NavigateProps) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(target);
  }, [navigate, target]);

  return <div>Redirecting...</div>;
}
