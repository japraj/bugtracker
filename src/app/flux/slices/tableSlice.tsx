import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TableState {
  tabIndex: number;
  pageIndex: number;
  nodesPerPage: number;
  totalPages: number;
}

export const initialState: TableState = {
  tabIndex: 0,
  pageIndex: 1,
  nodesPerPage: 5,
  totalPages: 10,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTabIndex: {
      reducer(state, action: PayloadAction<number>) {
        state.tabIndex = action.payload;
      },
      prepare(payload: number) {
        return { payload };
      },
    },
    setPageIndex: {
      reducer(state, action: PayloadAction<number>) {
        if (action.payload < 1) action.payload = 1;
        else if (action.payload > state.totalPages)
          action.payload = state.totalPages;
        state.pageIndex = action.payload;
      },
      prepare(payload: number) {
        return { payload };
      },
    },
    setNodesPerPage: {
      reducer(state, action: PayloadAction<number>) {
        if (action.payload < 1) action.payload = 1;
        else if (action.payload > state.totalPages) action.payload = 50;
        state.nodesPerPage = action.payload;
      },
      prepare(payload: number) {
        return { payload };
      },
    },
    setTotalPages: {
      reducer(state, action: PayloadAction<number>) {
        state.totalPages = action.payload;
      },
      prepare(payload: number) {
        return { payload };
      },
    },
  },
});

export const {
  setTabIndex,
  setPageIndex,
  setNodesPerPage,
  setTotalPages,
} = tableSlice.actions;

export const selectTabIndex = (state: RootState) => state.table.tabIndex;

export const selectPageIndex = (state: RootState) => state.table.pageIndex;

export const selectNodesPerPage = (state: RootState) =>
  state.table.nodesPerPage;

export const selectTotalPages = (state: RootState) => state.table.totalPages;

export default tableSlice.reducer;
