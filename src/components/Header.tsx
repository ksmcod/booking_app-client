import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLogoutUserMutation } from "@/app/api/usersApi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarImage } from "./ui/avatar";

import Logo from "./Logo";
import { clearIsLoggedIn, clearUser } from "@/app/slices/userSlice";
import toast from "react-hot-toast";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser()
      .then(() => {
        dispatch(clearIsLoggedIn());
        dispatch(clearUser());
        toast.success("See you soon...");
        navigate("/");
      })
      .catch(() => {
        toast.error("An error occured");
      });
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
              <Avatar className="text-white hover:outline hover:outline-4 hover:outline-blue-300">
                {user.image ? (
                  <AvatarImage src={user.image} />
                ) : (
                  <HiOutlineUserCircle className="w-full h-full text-white" />
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-bold border shadow w-48 mx-4">
              <DropdownMenuLabel className="text-center">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full px-2">
                My Bookings
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full px-2">
                My Hotels
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full px-2">Team</DropdownMenuItem>
              <DropdownMenuSeparator className="w-full px-2" />
              <DropdownMenuItem
                className="w-full px-2 cursor-pointer"
                onClick={() => handleLogout()}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="text-white hover:outline hover:outline-4 hover:outline-blue-300">
                <HiOutlineUserCircle className="w-full h-full" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-40 shadow">
              <DropdownMenuItem className="cursor-pointer flex">
                <Link to={"register"} className="w-full">
                  Register
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to={"login"} className="w-full">
                  Login
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
