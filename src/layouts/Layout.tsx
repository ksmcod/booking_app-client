import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import { useCheckUserQuery } from "../app/api/usersApi";
import { useAppDispatch } from "../app/hooks";
import { setUser, clearUser } from "../app/slices/userSlice";
import { useCallback, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { refetch, isLoading } = useCheckUserQuery();

  const check = useCallback(async () => {
    await refetch()
      .unwrap()
      .then((payload) => {
        console.log("SUCCESS -> ", payload);
        dispatch(setUser(payload));
      })
      .catch((err) => {
        if (err?.status === 401) {
          console.log("ERROR -> ", err);
          dispatch(clearUser());
        }
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // if (isError && (error as any)?.status === 401) {
  //   console.log("ERROR HERE -> ", error);
  //   dispatch(clearUser());
  // }

  useEffect(() => {
    check();
  }, [location.key, check]);

  return (
    !isLoading && (
      <div className="flex flex-col min-h-screen justify-between roboto relative">
        {/* <Header /> */}
        <div className="">
          <Header />
          {location.pathname === "/" && <Hero />}
        </div>

        {/* <div className="flex-1 max-w-7xl mx-auto w-full mt-16"> */}
        <div className="flex-1 max-w-6xl mx-auto w-full">
          <Outlet />
        </div>

        <Footer />
      </div>
    )
  );
}
