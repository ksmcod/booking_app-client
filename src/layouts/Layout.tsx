import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import {
  useLazyCheckTokenQuery,
  useLazyGetUserQuery,
} from "../app/api/usersApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setUser,
  clearUser,
  setIsLoggedIn,
  clearIsLoggedIn,
} from "../app/slices/userSlice";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [getUser] = useLazyGetUserQuery();
  const [checkToken, { isLoading }] = useLazyCheckTokenQuery();

  // const getUserFn = useCallback(async () => {
  //   await getUser()
  //     .unwrap()
  //     .then((payload) => {
  //       dispatch(setUser(payload));
  //     })
  //     .catch((err) => {
  //       if (err?.status === 401) {
  //         dispatch(clearUser());
  //       }
  //     });
  // }, [getUser, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // if (isError && (error as any)?.status === 401) {
  //   console.log("ERROR HERE -> ", error);
  //   dispatch(clearUser());
  // }

  // Fetch User info ONCE, when layout is hydrated for the first time
  useEffect(() => {
    async function getUserFn() {
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

    getUserFn();
  }, [dispatch, getUser, isLoggedIn]);

  // Send request on every page load, to check token availability
  useEffect(() => {
    checkToken()
      .unwrap()
      .then(() => dispatch(setIsLoggedIn()))
      .catch(() => {
        // dispatch(clearUser());
        dispatch(clearIsLoggedIn());
      });
  }, [checkToken, dispatch, location.key]);

  return (
    !isLoading && (
      <div className="flex flex-col min-h-screen justify-between roboto relative bg-white">
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
