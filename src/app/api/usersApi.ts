import { api } from "./api";
import { RegisterFormData } from "../../pages/Register";
import { User } from "../../types";
import { LoginFormData } from "../../pages/Login";

const AUTH_URL = "/auth";
const USER_URL = "/users";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, RegisterFormData>({
      query: (body) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<User, LoginFormData>({
      query: (body) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: `${AUTH_URL}/get-user`,
      }),
    }),
    checkToken: builder.query<void, void>({
      query: () => `${AUTH_URL}/check-token`,
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useLazyCheckTokenQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = usersApi;
