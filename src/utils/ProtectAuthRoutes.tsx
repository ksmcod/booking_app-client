import { useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectAuthRoutes() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }

    // DO NOT ADD 'isLoggedIn' TO DEPS ARRAY
  }, [navigate]);

  if (isLoggedIn) {
    return <></>;
  } else {
    return <Outlet />;
  }
}
