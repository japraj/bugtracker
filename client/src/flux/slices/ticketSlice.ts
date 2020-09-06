import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { Ticket, EditedTicket, getTicketFromDTO } from "../../constants/ticket";
import Endpoints from "../../constants/api";
import { UserInfo, Rank } from "../../constants/user";
import history from "../../routes/history";
import Routes from "../../constants/routes";

export interface TicketState {
  displayModal: boolean;
  failedImages: number;
  currentTicket: Ticket;
  displayEditModal: boolean;
  editedTicket: EditedTicket;
}

const generateComplement = (universe: string[], subset: string[]): string[] =>
  universe.filter((user) => subset.indexOf(user) === -1);

const initialState: TicketState = {
  displayModal: false,
  failedImages: 0,
  currentTicket: {
    id: -1,
    author: "",
    typeLabel: 0,
    creationDate: "",
    updateDate: "",
    title: "",
    description: "",
    reproducibility: 0,
    severity: 0,
    status: 0,
    assignees: [],
    imageLinks: [],
    activity: [],
  },
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
    addComment: (state, action: PayloadAction<number>) => {
      var set = Object.assign(state.currentTicket.activity);
      set.push(action.payload);
      state.currentTicket.activity = set;
      state.currentTicket.updateDate = new Date()
        .toISOString()
        .replace("Z", "");
    },
    loadTicket: (state, action: PayloadAction<Ticket>) => {
      state = Object.assign(state, {
        displayModal: true,
        failedImages: 0,
        currentTicket: Object.assign(action.payload),
        editedTicket: {
          ...action.payload,
        },
      });
    },
    reportLoadingFailure: (state) => {
      state.failedImages++;
    },
    toggleEditDisplay: (state) => {
      state.displayEditModal = !state.displayEditModal;
    },
    updateEdit: (state, action: PayloadAction<object>) => {
      state.editedTicket = Object.assign(state.editedTicket, action.payload);
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
  addComment,
  toggleDisplay,
  loadTicket,
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
    state.context.stores.users.allKeys
      .map((key) => state.context.stores.users.byKey[key])
      .filter((u: UserInfo) => u.rank > Rank.User)
      .map((u) => u.tag),
    state.ticket.editedTicket.assignees
  );

export const loadTicketById = (id: string): AppThunk => (dispatch) => {
  const err: () => void = () => {
    history.push(Routes.DNE404);
    dispatch(forceCloseDisplays());
  };

  fetch(`${Endpoints.TICKET_BY_ID}/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res: any) => {
      if (res.status === 200) dispatch(loadTicket(getTicketFromDTO(res)));
      else err();
    })
    .catch(err);
};

export default ticketSlice.reducer;
