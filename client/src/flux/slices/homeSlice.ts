import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Notification } from "../../constants/user";

interface HomeState {
  recentActivity: Notification[];
}

const initialState: HomeState = {
  recentActivity: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setRecentActivity: {
      reducer(state, action: PayloadAction<Notification[]>) {
        state.recentActivity = action.payload;
      },
      prepare(payload: Notification[]) {
        return { payload };
      },
    },
  },
});

export const { setRecentActivity } = homeSlice.actions;

export const selectRecentActivity = (state: RootState): Notification[] =>
  state.home.recentActivity;

export default homeSlice.reducer;
