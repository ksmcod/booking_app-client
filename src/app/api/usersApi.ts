import { api } from "./api";
import { RegisterFormData } from "../../pages/Register";
import { User } from "../../types";

const AUTH_URL = "/auth";
const USER_URL = "/users";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, RegisterFormData>({
      query: (body) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    checkUser: builder.query<User, void>({
      query: () => ({
        url: `${AUTH_URL}/check`,
      }),
    }),
  }),
});

export const { useCheckUserQuery, useRegisterUserMutation } = usersApi;
