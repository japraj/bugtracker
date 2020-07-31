import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewTicket } from "../../constants";
import { RootState } from "../store";

interface CreationState {
  displayModal: boolean;
  newTicket: NewTicket;
}

const initialState: CreationState = {
  displayModal: false,
  newTicket: {
    title: "",
    description: "",
    status: 0,
    severity: 0,
    reproducibility: 0,
    typeLabel: 0,
    imageLinks: [],
  },
};

export const creationSlice = createSlice({
  name: "creation",
  initialState,
  reducers: {
    toggleDisplay: (state) => {
      state.displayModal = !state.displayModal;
    },
    updateNewTicket: {
      reducer(state, action: PayloadAction<object>) {
        state.newTicket = Object.assign(state.newTicket, action.payload);
      },
      prepare(payload: object) {
        return { payload };
      },
    },
    wipeLocalChanges: (state) => {
      state = Object.assign(state, initialState);
    },
  },
});

export const {
  toggleDisplay,
  updateNewTicket,
  wipeLocalChanges,
} = creationSlice.actions;

export const selectDisplayed = (state: RootState) =>
  state.creation.displayModal;

export const selectNewTicket = (state: RootState) => state.creation.newTicket;

export default creationSlice.reducer;
