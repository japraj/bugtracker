import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  UserInfo,
  Notification,
  CollapsedTicket,
  getTagsFromUsers,
} from "../../constants";
import { User } from "../../seed/predefined";
import { generateNotificationSet, generateTicketSet } from "../../seed";

// This slice is used for viewing other users' profiles!
// it has nothing to do with the local user/client
export interface UserState {
  info: UserInfo;
  stagedUrl: string;
  recentActivity: Notification[];
  tickets: CollapsedTicket[];
}

export const initialState: UserState = {
  info: {
    profileImg: "",
    tag: "",
    rank: -1,
  },
  stagedUrl: "",
  recentActivity: [],
  tickets: [],
};

interface LoadUserPayload {
  info: UserInfo;
  recentActivity: Notification[];
  tickets: CollapsedTicket[];
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: {
      reducer(state, action: PayloadAction<LoadUserPayload | undefined>) {
        //  const tag = action.payload;
        // // try to load user by tag
        //     const index = getTagsFromUsers(User).indexOf(tag);
        //    const user = index === -1 ? initialState.info : User[index];
        if (action.payload !== undefined) {
          state = Object.assign(state, action.payload, {
            stagedUrl: action.payload.info.profileImg,
          });
        }
      },
      prepare(payload: LoadUserPayload | undefined) {
        return { payload };
      },
    },
    setStaged: {
      reducer(state, action: PayloadAction<string>) {
        state.stagedUrl = action.payload;
      },
      prepare(payload: string) {
        return { payload };
      },
    },
  },
});

export const { loadUser, setStaged } = userSlice.actions;

export const selectUserInfo = (state: RootState): UserInfo => state.user.info;

export const selectActivity = (state: RootState): Notification[] =>
  state.user.recentActivity;

export const selectTickets = (state: RootState): CollapsedTicket[] =>
  state.user.tickets;

export const selectStaged = (state: RootState): string => state.user.stagedUrl;

export default userSlice.reducer;
