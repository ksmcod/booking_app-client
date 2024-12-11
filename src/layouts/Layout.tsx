import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import { useLazyGetUserQuery, useCheckTokenQuery } from "../app/api/usersApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setUser,
  clearUser,
  setIsLoggedIn,
  clearIsLoggedIn,
} from "../app/slices/userSlice";
import { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
// import toast from "react-hot-toast";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const currentUser = useAppSelector((state) => state.user.user);

  const [getUser] = useLazyGetUserQuery();
  // const [checkToken, { isLoading }] = useLazyCheckTokenQuery();
  const { refetch, isLoading } = useCheckTokenQuery();

  // Fetch User info ONCE, when layout is hydrated for the first time
  useEffect(() => {
    async function getUserFn() {
      if (!currentUser || !isLoggedIn) {
        await getUser()
          .unwrap()
          .then((payload) => {
            dispatch(setUser(payload));
          })
          .catch((err) => {
            console.log("ERROR IN GET USER: ", err);
            if (err?.status === 401) {
              dispatch(clearUser());
            }
          });
      }
    }

    getUserFn();
  }, [dispatch, getUser, isLoggedIn, currentUser]);

  // Send request on every page load, to check token availability
  useEffect(() => {
    // toast.success("hello");
    // toast.error("goodbye");
    // toast("See you");

    refetch()
      .unwrap()
      .then(() => dispatch(setIsLoggedIn()))
      .catch(() => {
        // dispatch(clearUser());
        dispatch(clearIsLoggedIn());
      });
  }, [refetch, dispatch, location.key]);

  // Redirect after login if need be
  useEffect(() => {
    const next = sessionStorage.getItem("next");

    if (next) {
      sessionStorage.removeItem("next");
      navigate(next);
    }
  }, [navigate]);

  console.log("Api url: ", import.meta.env.VITE_API_URL);

  return (
    !isLoading && (
      <div className="flex flex-col gap-2 min-h-screen justify-between roboto relative bg-white">
        {/* <Header /> */}
        <div className="">
          <Header />
          {(location.pathname === "/" || location.pathname === "/search") && (
            <>
              <Hero />
              <SearchBar />
            </>
          )}
        </div>

        {/* <div className="flex-1 max-w-7xl mx-auto w-full mt-16"> */}
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-2 pb-10">
          <Outlet />
        </div>

        <Footer />
      </div>
    )
  );
}
