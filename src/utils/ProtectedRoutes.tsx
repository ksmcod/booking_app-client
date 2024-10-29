import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    // return <div className="">{navigate("/login", { replace: true })}</div>;
    navigate("/login", { replace: true });
  }
}
