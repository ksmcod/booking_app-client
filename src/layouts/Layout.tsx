import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen justify-between roboto relative">
      {/* <Header /> */}
      <div className="">
        <Header />
        {location.pathname === "/" && <Hero />}
      </div>

      {/* <div className="flex-1 max-w-7xl mx-auto w-full mt-16"> */}
      <div className="flex-1 max-w-7xl mx-auto w-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
