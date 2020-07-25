import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserInfo {
  profileImg: string;
  tag: string;
  rank: number;
}

export interface Notification {
  author: UserInfo;
  message: string;
  to: string;
  new: boolean;
}

export interface User {
  authenticated: boolean;
  id: number;
  notifications: Notification[];
  info: UserInfo;
}
//  Note: the permissions integer stored in the front-end
// is only meant to be used for soft-locking the user;
// even if they somehow access a restricted section
// of the site, the components should make a request
// with their id & back-end will verify it, preventing
// any trickery. The same idea applies to any api requests

interface AuthState {
  loaded: boolean;
  user: User;
}

export const initialState: AuthState = {
  loaded: false,
  user: {
    authenticated: false,
    id: 0,
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
  },
});

export const {
  finishedLoading,
  loadUser,
  viewNotifications,
} = authSlice.actions;

export const selectAuthSlice = (state: RootState): AuthState =>
  state.authentication;

export const selectUser = (state: RootState): User => state.authentication.user;

export const selectUserRank = (state: RootState): number =>
  state.authentication.user.info.rank;

export default authSlice.reducer;
