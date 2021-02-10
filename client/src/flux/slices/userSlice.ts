import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectElementsByKeys } from "./contextSlice";
import { CollapsedTicket } from "../../constants/ticket";
import Endpoints from "../../constants/api";
import { UserInfo, LoadUserPayload } from "../../constants/user";
import { Notification } from "../../constants/notification";
import Routes from "../../constants/routes";
import history from "../../routes/history";

// This slice is used for viewing other users' profiles!
// it has nothing to do with the local user/client
export interface UserState {
  loading: boolean;
  info: UserInfo;
  stagedUrl: string;
  recentActivity: number[];
  tickets: number[];
}

export const initialState: UserState = {
  loading: true,
  info: {
    profileImg: "",
    tag: "",
    rank: 0,
  },
  stagedUrl: "",
  recentActivity: [],
  tickets: [],
};

// load user with specified tag from server
export const loadUserByTag = createAsyncThunk<LoadUserPayload, string, {}>(
  "user/loadUserByTag",
  async (tag: string, thunk) => {
    const res = await fetch(`${Endpoints.USER_BY_TAG}/${tag}`, {
      method: "GET",
    });

    if (res.status === 404) thunk.rejectWithValue(res.status);
    else return res.json();
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // update the user object stored in the userSlice; different
    // from loading a new user entirely (use loadUserByTag for
    // that!)
    updateUser: (state, action: PayloadAction<UserInfo>) => {
      state = Object.assign(state, { info: action.payload });
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
  extraReducers: (builder) => {
    builder.addCase(loadUserByTag.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUserByTag.fulfilled, (state, { payload }) => {
      // halt loading, load user into state
      state.loading = false;
      state = Object.assign(state, {
        info: {
          tag: payload.tag,
          rank: payload.rank,
          profileImg: payload.profileImg,
        },
        recentActivity: payload.activity,
        tickets: payload.tickets,
      });
    });
    builder.addCase(loadUserByTag.rejected, (state, action) => {
      // halt loading, and forward user to 404 route
      //state.loading = false;
      history.push(Routes.DNE404);
    });
  },
});

export const { updateUser, setStaged } = userSlice.actions;

export const selectLoadState = (state: RootState): boolean =>
  state.user.loading;

export const selectUserInfo = (state: RootState): UserInfo => state.user.info;

export const selectActivity = (state: RootState): Notification[] =>
  selectElementsByKeys("activity")(state)(
    state.user.recentActivity.map((e) => e.toString())
  );

export const selectTickets = (state: RootState): CollapsedTicket[] =>
  selectElementsByKeys("collapsedTickets")(state)(
    state.user.tickets.map((e) => e.toString())
  );

export const selectStaged = (state: RootState): string => state.user.stagedUrl;

export default userSlice.reducer;
