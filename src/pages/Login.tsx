import { useCallback, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Loader from "../components/Loader";

import githubmarkwhite from "../assets/github-mark/github-mark-white.png";

import { useLoginUserMutation } from "../app/api/usersApi";
import { useAppDispatch } from "../app/hooks";
import { setUser, setIsLoggedIn } from "../app/slices/userSlice";

import handleGithubLogin from "@/utils/handleGithub";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
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
        toast.success("Welcome back");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.data?.message ?? "An error occured");
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
            <input
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
            <input
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
            <button
              disabled={isLoading}
              className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 active:opacity-90 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? <Loader /> : "Login"}
            </button>

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
        <div className="my-1 px-4 py-2">
          <button
            onClick={() => handleGithubLogin()}
            className="w-full py-2 bg-black flex justify-center items-center gap-4 rounded text-white font-bold hover:opacity-90 active:opacity-85"
          >
            Continue with Github
            <img src={githubmarkwhite} alt="Github logo" className="w-9" />
          </button>
        </div>
      </div>
    </div>
  );
}
