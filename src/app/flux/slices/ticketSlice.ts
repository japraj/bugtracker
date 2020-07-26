import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo, Notification } from "./authSlice";
import { generateTicket } from "../../seed";

export enum Reproducibility {
  "Always",
  "Common",
  "Uncommon",
  "Rare",
  "Never",
}

export interface Ticket {
  id: string;
  author: UserInfo;
  creationDate: number;
  updateDate: number;
  title: string;
  description: string;
  reproducibility: number;
  severity: number;
  status: number;
  assignees: UserInfo[];
  imageLinks: string[];
  comments: Notification[];
}

interface TicketState {
  displayModal: boolean;
  currentTicket: Ticket;
}

const initialState: TicketState = {
  displayModal: false,
  currentTicket: {
    id: "null",
    author: {
      tag: "",
      profileImg: "",
      rank: -1,
    },
    creationDate: 0,
    updateDate: 0,
    title: "",
    description: "",
    reproducibility: 0,
    severity: 0,
    status: 0,
    assignees: [],
    imageLinks: [],
    comments: [],
  },
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    toggleDisplay: (state) => {
      state.displayModal = !state.displayModal;
    },
    loadTicketById: {
      reducer(state, action: PayloadAction<string>) {
        state = Object.assign(state, {
          displayModal: true,
          currentTicket: Object.assign(generateTicket(), {
            id: action.payload,
          }),
        });
      },
      prepare(payload: string) {
        return { payload };
      },
    },
  },
});

export const { toggleDisplay, loadTicketById } = ticketSlice.actions;

export const selectDisplayed = (state: RootState) => state.ticket.displayModal;

export const selectTicket = (state: RootState) => state.ticket.currentTicket;

export default ticketSlice.reducer;