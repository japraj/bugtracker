import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Ticket {
  id: string;
}

interface TicketState {
  displayTicketModal: boolean;
  currentTicketId: string;
  currentTicket: Ticket | null;
}

const initialState: TicketState = {
  displayTicketModal: false,
  currentTicketId: "",
  currentTicket: null,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    toggleDisplay: (state) => {
      state.displayTicketModal = !state.displayTicketModal;
    },
    setTicketId: {
      reducer(state, action: PayloadAction<string>) {
        state = Object.assign(state, {
          currentTicketId: action.payload,
          currentTicket: null,
        });
      },
      prepare(payload: string) {
        return { payload };
      },
    },
  },
});

export const { toggleDisplay, setTicketId } = ticketSlice.actions;

export const selectDisplayed = (state: RootState) =>
  state.ticket.displayTicketModal;

export default ticketSlice.reducer;
