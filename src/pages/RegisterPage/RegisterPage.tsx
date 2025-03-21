import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch } from "@/app/hooks";
import { setIsLoggedIn, setUser } from "@/app/slices/userSlice";

import { useRegisterUserMutation } from "@/app/api/usersApi";

import githubmarkwhite from "@/assets/github-mark/github-mark-white.png";
import Loader from "@/components/Loader";

import githubLogin from "@/utils/handleGithub";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import handleApiError from "@/utils/handleApiError";
import { ApiErrorType } from "@/types";

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    registerUser(data)
      .unwrap()
      .then((payload) => {
        dispatch(setIsLoggedIn());
        dispatch(setUser(payload));

        // Redirect to specific page after signup if necessary
        const next = searchParams.get("next");
        if (next) {
          searchParams.delete("next");
          const urlInfo = searchParams;
          toast.success("Welcome aboard");
          return navigate(`${next}?${urlInfo}`);
        }
        toast.success("Welcome aboard");
        navigate("/");
      })
      .catch((error) => {
        handleApiError(error as ApiErrorType);
      });
  });

  // Function to handle Github signup
  function handleGithubSignup() {
    const nextUrl = searchParams.get("next");

    if (nextUrl) {
      searchParams.delete("next");
      const next = `${nextUrl}?${searchParams.toString()}`;
      sessionStorage.setItem("next", next);
      return githubLogin();
    }

    githubLogin();
  }

  return (
    <div className="p-4">
      <div className="border max-w-4xl mx-auto p-3">
        <form onSubmit={onSubmit} className="flex flex-col gap-5 p-4 ">
          <h2 className="text-3xl font-bold text-center">Create an account</h2>
          <div className="flex flex-col md:flex-row gap-5">
            {/*First name field  */}
            <label
              htmlFor="firstName"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              First Name
              <Input
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
              <Input
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
            <Input
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
            <Input
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
            <Input
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
          <div className="flex flex-col gap-1">
            <Button disabled={isLoading} variant="primary">
              {isLoading ? (
                <Loader className="size-7 text-white" />
              ) : (
                "Create account"
              )}
            </Button>

            <span className="text-sm text-neutral-500 flex gap-1">
              Already have an account?
              <Link to={"/login"} className="hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>

        <hr className="w-5/6 mx-auto" />

        {/* SOCIAL MEDIA LOGIN */}
        <div className="my-1 px-4 py-2">
          <Button variant="black" onClick={handleGithubSignup}>
            <span>Continue with Github</span>
            <img src={githubmarkwhite} alt="Github logo" className="w-9" />
          </Button>
        </div>
      </div>
    </div>
  );
}
