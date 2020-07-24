import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface UserInfo {
  profileImg: string;
  tag: string;
  rank: number;
}

export interface User {
  authenticated: boolean;
  id: number;
  notifications: String[];
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
      rank: 0,
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
  },
});

export const { finishedLoading, loadUser } = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.authentication;

export const selectUser = (state: RootState) => state.authentication.user;

export const selectUserRank = (state: RootState) =>
  state.authentication.user.info.rank;

export default authSlice.reducer;
