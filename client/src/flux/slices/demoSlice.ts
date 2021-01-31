import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoadUserPayload } from "../../constants/user";
import { Normalized, initialNormalized } from "./contextSlice";
import { Ticket } from "../../constants/ticket";
import { DataSet, arrayToNormalized } from "../../seed";

export interface DemoState {
  demoMode: boolean;
  users: Normalized<LoadUserPayload>;
  tickets: Normalized<Ticket>;
}

export const initialState: DemoState = {
  demoMode: false,
  users: initialNormalized,
  tickets: initialNormalized,
};

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    initDemoSlice: (state, action: PayloadAction<DataSet>) => {
      state = Object.assign(state, {
        demoMode: true,
        users: arrayToNormalized(action.payload.users, "tag"),
        tickets: arrayToNormalized(action.payload.tickets, "id"),
      });
    },
  },
});

export const { initDemoSlice } = demoSlice.actions;

export const selectDemoMode = (state: RootState): boolean =>
  state.demo.demoMode;

export default demoSlice.reducer;
