import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface State {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: State = { user: null, isLoggedIn: false };

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
    clearIsLoggedIn(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser, setIsLoggedIn, clearIsLoggedIn } =
  userSlice.actions;

export default userSlice.reducer;
