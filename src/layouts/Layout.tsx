import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between roboto-mono">
      <div className="">
        <Header />
        <Hero />
      </div>

      <div className="flex-grow container mx-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
