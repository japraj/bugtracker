import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Ticket, EditedTicket, UserInfo } from "../../constants";
import { generateTicket } from "../../seed";
import { User } from "../../seed/predefined";

export interface TicketState {
  displayModal: boolean;
  failedImages: number;
  currentTicket: Ticket;
  // A set of all developers, used in edit modal's assignment section
  displayEditModal: boolean;
  developers: UserInfo[];
  editedTicket: EditedTicket;
}

const generateComplement = (
  universe: UserInfo[],
  subset: UserInfo[]
): UserInfo[] =>
  universe.filter((user) => {
    for (let subsetUser of subset)
      if (user.tag === subsetUser.tag) return false;
    return true;
  });

const fetchDevs = (): UserInfo[] => {
  return User;
};

const initialState: TicketState = {
  displayModal: false,
  failedImages: 0,
  currentTicket: {
    id: "null",
    author: {
      tag: "",
      profileImg: "",
      rank: -1,
    },
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
  },
});

export const {
  toggleDisplay,
  loadTicketById,
  reportLoadingFailure,
  toggleEditDisplay,
  updateEdit,
  wipeLocalChanges,
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
