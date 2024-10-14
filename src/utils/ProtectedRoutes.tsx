import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export default function ProtectedRoutes() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return isLoggedIn ? <Outlet /> : Navigate({ to: "login", replace: true });
}
