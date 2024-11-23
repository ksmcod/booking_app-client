import { useCallback, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Loader from "@/components/Loader";

import githubmarkwhite from "@/assets/github-mark/github-mark-white.png";

import { useLoginUserMutation } from "@/app/api/usersApi";
import { useAppDispatch } from "@/app/hooks";
import { setUser, setIsLoggedIn } from "@/app/slices/userSlice";

import githubLogin from "@/utils/handleGithub";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import handleApiError from "@/utils/handleApiError";
import { ApiErrorType } from "@/types";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    loginUser(data)
      .unwrap()
      .then((payload) => {
        dispatch(setIsLoggedIn());
        dispatch(setUser(payload));
        const next = searchParams.get("next");
        if (next) {
          searchParams.delete("next");
          const urlInfo = searchParams;
          toast.success("Welcome back");
          return navigate(`${next}?${urlInfo}`);
        }
        toast.success("Welcome back");
        navigate("/");
      })
      .catch((error) => {
        handleApiError(error as ApiErrorType);
      });
  });

  const authError = useCallback(() => {
    const isError = searchParams.has("error");

    if (isError) {
      const errorMessage = searchParams.get("error");
      toast.error(errorMessage);
      searchParams.delete("error");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // Handle the github login flow
  function handleGithubLogin() {
    const nextUrl = searchParams.get("next");

    if (nextUrl) {
      searchParams.delete("next");
      const next = `${nextUrl}?${searchParams.toString()}`;
      console.log("Next is: ", next);
      sessionStorage.setItem("next", next);
      return githubLogin();
    }

    githubLogin();
  }

  // Runs everytime an auth page loads to show message
  useEffect(() => {
    authError();
  }, [authError]);

  return (
    <div className="p-4">
      <div className="border max-w-4xl mx-auto p-3">
        <form className="flex flex-col gap-5 p-4" onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <div className=""></div>
          <label
            htmlFor="email"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Email
            <Input
              type="email"
              className="border rounded w-full p-2 font-normal"
              id="email"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>

          {/* Password field */}
          <label
            htmlFor="password"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Password
            <Input
              type="password"
              className="border rounded w-full p-2 font-normal"
              id="password"
              {...register("password", { required: "This field is required" })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>

          {/* Submit button */}
          <div className="flex flex-col gap-1">
            <Button disabled={isLoading} variant="primary">
              {isLoading ? <Loader className="size-7 text-white" /> : "Login"}
            </Button>

            <span className="text-sm text-neutral-500 flex gap-1">
              Don't have an account?
              <Link to={"/register"} className="hover:underline">
                Create one
              </Link>
            </span>
          </div>
        </form>

        <hr className="w-5/6 mx-auto" />

        {/* SOCIAL MEDIA LOGIN */}
        <div className="my-1 px-4 py-2 space-y-5">
          <Button variant="black" onClick={handleGithubLogin}>
            <span>Continue with Github</span>
            <img src={githubmarkwhite} alt="Github logo" className="w-9" />
          </Button>
        </div>
      </div>
    </div>
  );
}
