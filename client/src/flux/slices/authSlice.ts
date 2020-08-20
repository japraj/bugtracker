import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../constants/user";

interface AuthState {
  loaded: boolean;
  user: User;
}

export const initialState: AuthState = {
  loaded: false,
  user: {
    authenticated: false,
    notifications: [],
    info: {
      profileImg: "",
      tag: "",
      rank: -1,
    },
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
    viewNotifications: (state) => {
      state.user.notifications = state.user.notifications.map(
        (notification) => {
          return Object.assign(notification, {
            new: false,
          });
        }
      );
    },
    logout: (state) => {
      state = Object.assign(state, initialState, { loaded: true });
    },
  },
});

export const {
  finishedLoading,
  loadUser,
  viewNotifications,
  logout,
} = authSlice.actions;

export const selectAuthSlice = (state: RootState): AuthState =>
  state.authentication;

export const selectUser = (state: RootState): User => state.authentication.user;

export const selectUserRank = (state: RootState): number =>
  state.authentication.user.info.rank;

export const selectAuthenticated = (state: RootState): boolean =>
  state.authentication.user.authenticated;

export default authSlice.reducer;
