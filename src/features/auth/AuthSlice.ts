import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type User = {
  authenticated: boolean;
  id: number;
  permissions: number;
};

interface AuthState {
  loaded: boolean;
  user: User;
}

export const initialState: AuthState = {
  loaded: false,
  user: {
    authenticated: false,
    id: 0,
    permissions: 0,
  },
};

export const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    finishedLoading: (state) => {
      state.loaded = true;
    },
    loadUser: {
      reducer(state, action: PayloadAction<User>) {
        state.user = action.payload;
      },
      prepare(payload: User) {
        return { payload };
      },
    },
  },
});

export const { finishedLoading, loadUser } = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.authentication;

export default authSlice.reducer;
