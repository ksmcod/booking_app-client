import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import placeholder from "@/assets/placeholder.png";

import Logo from "./Logo";
import { useAppSelector } from "@/app/hooks";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();

  const linkToRegisterPage = () => {
    navigate("/register");
  };

  const linkToLoginPage = () => {
    navigate("/login");
  };

  return (
    // <div className="bg-blue-800 p-5 fixed w-full">
    <div className="bg-blue-800 p-5">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Logo />

        {/* <span className="flex space-x-2">
          <Link
            to={"/register"}
            className="flex items-center justify-center text-blue-600 px-6 rounded-sm font-bold bg-white hover:bg-gray-100"
          >
            Register
          </Link>
        </span> */}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarImage src={user.image ?? placeholder} />
                <AvatarFallback>
                  {user.name.split(" ")[0]}
                  {user.name.split(" ")[1]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-bold">
              <DropdownMenuLabel className="text-center">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Bookings</DropdownMenuItem>
              <DropdownMenuItem>My Hotels</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarImage src={placeholder} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-40 shadow">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => linkToRegisterPage()}
              >
                {/* <Link to={"register"} className="w-full">
                  Register
                </Link> */}
                Register
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => linkToLoginPage()}
              >
                {/* <Link to={"login"} className="w-full">
                  Login
                </Link> */}
                Login
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
