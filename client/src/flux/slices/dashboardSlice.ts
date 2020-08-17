import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DashboardState {
  loaded: boolean;
  infoData: string[];
  statusData: number[];
  severityData: number[];
  lineLabels: string[];
  lineData: number[];
}

const initialState: DashboardState = {
  loaded: false,
  infoData: [],
  statusData: [],
  severityData: [],
  lineLabels: [],
  lineData: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    loadData: (state) => {
      // make fetch request and load data.
      state = Object.assign(state, {
        loaded: true,
        infoData: ["1213", "432", "433", "114"],
        statusData: [61, 34, 45],
        severityData: [12, 32, 43],
        lineLabels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
        lineData: [5, 9, 7, 8, 5, 6, 4],
      });
    },
  },
});

export const { loadData } = homeSlice.actions;

export const selectDashboardSlice = (state: RootState): DashboardState =>
  state.dashboard;

export default homeSlice.reducer;
