import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoadUserPayload } from "../../constants/user";
import { Normalized, initialNormalized } from "./contextSlice";
import { Ticket } from "../../constants/ticket";
import { DataSet, arrayToNormalized, localUserInfo } from "../../seed";

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
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.byKey[action.payload.id.toString()] = action.payload;
      if (state.tickets.allKeys.indexOf(action.payload.id.toString()))
        state.tickets.allKeys.push(action.payload.id.toString());
    },
    updateUserActivity: (state, action: PayloadAction<number[]>) => {
      var user: LoadUserPayload = state.users.byKey[localUserInfo.tag];
      state.users.byKey[localUserInfo.tag] = Object.assign({}, user, {
        activity: user.activity.concat(action.payload),
      });
    },
    removeTicketRefs: (
      state,
      action: PayloadAction<{
        ticketId: number;
        activities: number[];
      }>
    ) => {
      // clean users
      state.users.allKeys.forEach((key: string) => {
        // if the user is the author of the ticket, delete the ref
        if (state.users.byKey[key].tickets.includes(action.payload.ticketId)) {
          state.users.byKey[key].tickets = state.users.byKey[
            key
          ].tickets.filter((id) => id !== action.payload.ticketId);
        }
        // remove all refs to the deleted ticket in user.activity
        state.users.byKey[key].activity = state.users.byKey[
          key
        ].activity.filter((id) => !action.payload.activities.includes(id));
      });
      // clean tickets
      state.tickets.allKeys.filter(
        (t) => t !== action.payload.ticketId.toString()
      );
      delete state.tickets.byKey[action.payload.ticketId];
    },
  },
});

export const {
  initDemoSlice,
  addTicket,
  updateUserActivity,
  removeTicketRefs,
} = demoSlice.actions;

export const selectDemoMode = (state: RootState): boolean =>
  state.demo.demoMode;

export default demoSlice.reducer;
