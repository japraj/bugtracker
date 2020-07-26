import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "./authSlice";

export interface CollapsedTicket {
  id: string;
  author: UserInfo;
  updateDate: number;
  title: string;
  severity: number;
  status: number;
  comments: number;
}

export enum Status {
  "unresolved",
  "work-in-progress",
  "resolved",
}

export enum Severity {
  "trivial",
  "minor",
  "major",
}

interface TableState {
  tabIndex: number;
  pageIndex: number;
  nodesPerPage: number;
  totalPages: number;
  collapsedTickets: CollapsedTicket[];
}

export const initialState: TableState = {
  tabIndex: 0,
  pageIndex: 1,
  nodesPerPage: 5,
  totalPages: 10,
  collapsedTickets: [],
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
    setCollapsedTickets: {
      reducer(state, action: PayloadAction<CollapsedTicket[]>) {
        state.collapsedTickets = action.payload;
      },
      prepare(payload: CollapsedTicket[]) {
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
  setCollapsedTickets,
} = tableSlice.actions;

export const selectTabIndex = (state: RootState): number =>
  state.table.tabIndex;

export const selectPageIndex = (state: RootState): number =>
  state.table.pageIndex;

export const selectNodesPerPage = (state: RootState): number =>
  state.table.nodesPerPage;

export const selectTotalPages = (state: RootState): number =>
  state.table.totalPages;

export const selectTickets = (state: RootState): CollapsedTicket[] =>
  state.table.collapsedTickets;

export default tableSlice.reducer;
