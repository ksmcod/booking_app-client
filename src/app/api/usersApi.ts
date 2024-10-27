import { api } from "./api";
import { RegisterFormData } from "../../pages/RegisterPage/RegisterPage";
import { UserType } from "../../types";
import { LoginFormData } from "../../pages/LoginPage/LoginPage";

const AUTH_URL = "/auth";
const USER_URL = "/users";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserType, RegisterFormData>({
      query: (body) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<UserType, LoginFormData>({
      query: (body) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<UserType, void>({
      query: () => ({
        url: `${AUTH_URL}/get-user`,
      }),
    }),
    checkToken: builder.query<void, void>({
      query: () => `${AUTH_URL}/check-token`,
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useLazyCheckTokenQuery,
  useCheckTokenQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = usersApi;
