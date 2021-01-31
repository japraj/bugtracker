import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { sortNotifications } from "../../constants/notification";
import { User } from "../../constants/user";

interface AuthState {
  loaded: boolean;
  user: User;
}

export const initialState: AuthState = {
  loaded: false,
  user: {
    authenticated: false,
    tickets: [],
    notifications: [],
    assigned: [],
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
    loadUser: (state, action: PayloadAction<User>) => {
      action.payload.notifications = sortNotifications(
        action.payload.notifications
      );
      state.user = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.user.info.profileImg = action.payload;
    },
    viewNotifications: (state) => {
      state.user.notifications = sortNotifications(
        state.user.notifications
          .filter((n) => n.new)
          .map((notification) =>
            Object.assign(notification, {
              new: false,
            })
          )
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
  updateAvatar,
} = authSlice.actions;

export const selectAuthSlice = (state: RootState): AuthState =>
  state.authentication;

export const selectUser = (state: RootState): User => state.authentication.user;

export const selectUserRank = (state: RootState): number =>
  state.authentication.user.info.rank;

export const selectAuthenticated = (state: RootState): boolean =>
  state.authentication.user.authenticated;

export default authSlice.reducer;
