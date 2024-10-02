import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/userSlice";

import { useRegisterUserMutation } from "../app/api/usersApi";

import githubmarkwhite from "../assets/github-mark/github-mark-white.png";
import Loader from "../components/Loader";

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
export default function Register() {
  const [registerMutation, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    registerMutation(data)
      .unwrap()
      .then((payload) => {
        console.log("Success... Payload: ", payload);
        toast.success("Registration successful");
        dispatch(setUser(payload));
        navigate("/");
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error(error?.data?.message ?? "An error occured", {
          position: "top-center",
        });
      });
  });

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

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
      <div className="border max-w-4xl mx-auto my-6 p-3">
        <form onSubmit={onSubmit} className="flex flex-col gap-5 p-4 ">
          <h2 className="text-3xl font-bold text-center">Create an account</h2>
          <div className="flex flex-col md:flex-row gap-5">
            {/*First name field  */}
            <label
              htmlFor="firstName"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              First Name
              <input
                className="border rounded w-full p-2 font-normal"
                id="firstName"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              {errors.firstName && (
                <span className="px-1 text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </label>

            {/* Last name field */}
            <label
              htmlFor="lastName"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              Last Name
              <input
                type="text"
                className="border rounded w-full p-2 font-normal"
                id="lastName"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              {errors.lastName && (
                <span className="px-1 text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </label>
          </div>

          {/*Email field  */}
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
              <span className="px-1 text-red-500">{errors.email.message}</span>
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
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Your password should be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className="px-1 text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>

          {/* Confirm password field */}
          <label
            htmlFor="confirmPassword"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Confirm password
            <input
              type="password"
              className="border rounded w-full p-2 font-normal"
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords don't match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="px-1 text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          {/* Submit button */}
          <button
            disabled={isLoading}
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 active:opacity-90 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : "Create account"}
          </button>

          <span className="text-sm text-neutral-500">
            Already have an account?
            <Link to={"/login"} className="hover:underline">
              Login
            </Link>
          </span>
        </form>

        <hr className="w-5/6 mx-auto" />

        {/* SOCIAL MEDIA LOGIN */}
        <div className="my-5 p-4">
          <button
            onClick={() => handleGithubLogin()}
            className="w-full py-2 bg-black flex justify-center items-center gap-4 rounded text-white font-bold hover:opacity-90 active:opacity-85"
          >
            Continue with Github
            <img src={githubmarkwhite} alt="Github logo" className="w-9" />
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}
