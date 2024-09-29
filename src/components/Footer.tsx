import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="bg-blue-800 pt-3 p-5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Logo />
        <span className="text-white font-bold tracking-tight flex flex-col md:flex-row gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}
