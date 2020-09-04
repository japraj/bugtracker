import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Sort } from "../../constants/table";

export interface HomeState {
  recentActivity: number[];
  tabIndex: number;
  pageIndex: number;
  nodesPerPage: number;
  totalPages: number;
  sort: string;
}

export const initialState: HomeState = {
  recentActivity: [],
  tabIndex: 0,
  pageIndex: 1,
  nodesPerPage: 5,
  totalPages: 10,
  sort: Sort.NEW,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setRecentActivity: (state, action: PayloadAction<number[]>) => {
      state.recentActivity = action.payload;
    },
    setTabIndex: (state, action: PayloadAction<number>) => {
      state.tabIndex = action.payload;
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      if (action.payload < 1) action.payload = 1;
      else if (action.payload > state.totalPages)
        action.payload = state.totalPages;
      state.pageIndex = action.payload;
    },
    setNodesPerPage: (state, action: PayloadAction<number>) => {
      if (action.payload < 1) action.payload = 1;
      else if (action.payload > 50) action.payload = 50;
      state.nodesPerPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setRecentActivity,
  setTabIndex,
  setPageIndex,
  setNodesPerPage,
  setTotalPages,
  setSort,
} = homeSlice.actions;

export const selectRecentActivity = (state: RootState): number[] =>
  state.home.recentActivity;

export const selectTabIndex = (state: RootState): number => state.home.tabIndex;

export const selectPageIndex = (state: RootState): number =>
  state.home.pageIndex;

export const selectNodesPerPage = (state: RootState): number =>
  state.home.nodesPerPage;

export const selectTotalPages = (state: RootState): number =>
  state.home.totalPages;

export const selectHomeSlice = (state: RootState): HomeState => state.home;

export default homeSlice.reducer;
