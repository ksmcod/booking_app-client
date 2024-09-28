import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="bg-blue-800 pt-3 pb-5">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}
