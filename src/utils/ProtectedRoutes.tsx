import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <div></div>;
  }
}
