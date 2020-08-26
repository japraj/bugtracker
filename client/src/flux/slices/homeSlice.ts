import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HomeState {
  recentActivity: number[];
}

const initialState: HomeState = {
  recentActivity: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setRecentActivity: (state, action: PayloadAction<number[]>) => {
      state.recentActivity = action.payload;
    },
  },
});

export const { setRecentActivity } = homeSlice.actions;

export const selectRecentActivity = (state: RootState): number[] =>
  state.home.recentActivity;

export default homeSlice.reducer;
