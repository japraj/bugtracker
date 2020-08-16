import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Ticket, EditedTicket, UserInfo } from "../../constants";
import { generateTicket } from "../../seed";
import { User } from "../../seed/predefined";

export interface TicketState {
  displayModal: boolean;
  failedImages: number;
  currentTicket: Ticket;
  displayEditModal: boolean;
  // A set of all developers, used in edit modal's assignment section
  developers: string[];
  editedTicket: EditedTicket;
}

const generateComplement = (universe: string[], subset: string[]): string[] =>
  universe.filter(
    (user) => subset.indexOf(user) !== -1
    // for (let subsetUser of subset)
    //   if (user === subsetUser) return false;
    // return true;}
  );

const fetchDevs = (): string[] => {
  return User.map((user) => user.tag);
};

const initialState: TicketState = {
  displayModal: false,
  failedImages: 0,
  currentTicket: {
    id: "null",
    author: "",
    typeLabel: 0,
    creationDate: 0,
    updateDate: 0,
    title: "",
    description: "",
    reproducibility: 0,
    severity: 0,
    status: 0,
    assignees: [],
    imageLinks: [],
    activity: [],
  },
  developers: fetchDevs(),
  displayEditModal: false,
  editedTicket: {
    title: "",
    description: "",
    status: 0,
    severity: 0,
    reproducibility: 0,
    typeLabel: 0,
    imageLinks: [],
    assignees: [],
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
        const ticket = generateTicket();
        state = Object.assign(state, {
          displayModal: true,
          failedImages: 0,
          currentTicket: Object.assign(ticket, {
            id: action.payload,
          }),
          editedTicket: {
            ...ticket,
          },
        });
      },
      prepare(payload: string) {
        return { payload };
      },
    },
    reportLoadingFailure: (state) => {
      state.failedImages++;
    },
    toggleEditDisplay: (state) => {
      state.displayEditModal = !state.displayEditModal;
    },
    updateEdit: {
      reducer(state, action: PayloadAction<object>) {
        state.editedTicket = Object.assign(state.editedTicket, action.payload);
      },
      prepare(payload: object) {
        return { payload };
      },
    },
    wipeLocalChanges: (state) => {
      state.editedTicket = state.currentTicket;
    },
    forceCloseDisplays: (state) => {
      state.displayModal = false;
      state.displayEditModal = false;
    },
  },
});

export const {
  toggleDisplay,
  loadTicketById,
  reportLoadingFailure,
  toggleEditDisplay,
  updateEdit,
  wipeLocalChanges,
  forceCloseDisplays,
} = ticketSlice.actions;

export const selectDisplayed = (state: RootState) => state.ticket.displayModal;

export const selectFailures = (state: RootState) => state.ticket.failedImages;

export const selectTicket = (state: RootState) => state.ticket.currentTicket;

export const selectTicketSlice = (state: RootState) => state.ticket;

export const selectAvailable = (state: RootState) =>
  generateComplement(
    state.ticket.developers,
    state.ticket.editedTicket.assignees
  );

export default ticketSlice.reducer;
