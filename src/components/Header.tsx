import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLogoutUserMutation } from "@/app/api/usersApi";
import { Avatar, AvatarImage } from "./ui/avatar";

import Logo from "./Logo";
import { clearIsLoggedIn, clearUser } from "@/app/slices/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import ButtonLink from "./ui/buttonLink";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  const wel = () => {
    if (isDropdownOpen) {
      // console.log("Window event called!!");
      setIsDropdownOpen(!isDropdownOpen);
    }

    window.removeEventListener("click", wel);
  };

  window.addEventListener("click", wel);

  function toggleDropdown(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log("Toggle dropdown function!!");
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="bg-blue-800 p-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center sm:relative py-1">
        <Logo />

        {isLoggedIn && (
          <div className="">
            <Avatar
              className="text-white hover:outline hover:outline-4 hover:outline-blue-300 size-10 hover:cursor-pointer"
              onClick={(e) => toggleDropdown(e)}
            >
              {user?.image ? (
                <AvatarImage src={user.image} />
              ) : (
                <HiOutlineUserCircle className="w-full h-full text-white" />
              )}
            </Avatar>

            {/* Dropdown Zone */}
            {isDropdownOpen && (
              <div className="p-2 absolute z-10 right-0 w-screen sm:w-60 ">
                <div className="bg-white p-1 shadow-md border rounded-sm w-full sm:top-full flex flex-col space-y-1">
                  <Link
                    to={"/my-account"}
                    className="w-full px-2 py-2 flex items-center rounded-sm hover:bg-blue-100 hover:underline hover:underline-offset-2"
                  >
                    My Account
                  </Link>
                  <Link
                    to={"/my-bookings"}
                    className="w-full px-2 py-2 flex items-center rounded-sm hover:bg-blue-100 hover:underline hover:underline-offset-2"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to={"/my-hotels"}
                    className="w-full px-2 py-2 flex items-center rounded-sm hover:bg-blue-100 hover:underline hover:underline-offset-2"
                  >
                    My Hotels
                  </Link>

                  <hr />

                  <div
                    className="w-full px-2 py-2 flex items-center rounded-sm hover:bg-blue-100 hover:underline hover:underline-offset-2 hover:cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoggedIn && (
          <div className="flex items-center gap-2">
            <ButtonLink
              target="/login"
              className="bg-blue-800 hover:bg-blue-600 font-normal hover:text-white hover:underline underline-offset-2"
            >
              Sign in
            </ButtonLink>

            <ButtonLink
              target="/register"
              className="hidden sm:block hover:bg-blue-950 hover:text-blue-400 bg-blue-900  hover:underline underline-offset-2"
            >
              Create account
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
