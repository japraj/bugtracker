import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo, Notification } from "./authSlice";
import { generateTicket } from "../../seed";
import { User } from "../../seed/predefined";

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
  failedImages: number;
  currentTicket: Ticket;
  // Universal set
  developers: UserInfo[];
  // A subset of the Universal set; this is the set of
  // assignees that the user has staged for commit
  stagedAssignees: UserInfo[];
  // The complement to the above subset
  available: UserInfo[];
}

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
  developers: fetchDevs(),
  stagedAssignees: [],
  available: [],
};

const getUsersFromTags = (users: UserInfo[], tags: string[]): UserInfo[] =>
  users.filter((user) => tags.includes(user.tag));

const getTagsFromUsers = (users: UserInfo[]): string[] =>
  users.map((user) => user.tag);

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
          stagedAssignees: ticket.assignees,
          available: state.developers.filter((developer) => {
            for (let assignee of ticket.assignees)
              if (assignee.tag === developer.tag) return false;
            return true;
          }),
        });
      },
      prepare(payload: string) {
        return { payload };
      },
    },
    reportLoadingFailure: (state) => {
      state.failedImages++;
    },
    wipePendingCommit: (state) => {
      state = Object.assign(state, {
        stagedAssignees: state.currentTicket.assignees,
        available: state.developers.filter((developer) => {
          for (let assignee of state.currentTicket.assignees)
            if (assignee.tag === developer.tag) return false;
          return true;
        }),
      });
    },
    moveToNewSet: {
      reducer(state, action: PayloadAction<string>) {
        const userTag = action.payload;
        // If the user is currently available, then we
        // want to assign them. Else, we want to unassign
        let ASSIGN_USER: boolean = getTagsFromUsers(state.available).includes(
          userTag
        );
        // Set our origin and destination according to
        // whether we want to assign the user or not
        let originArray: string[] = getTagsFromUsers(
          ASSIGN_USER ? state.available : state.stagedAssignees
        );
        let destinationArray: string[] = getTagsFromUsers(
          ASSIGN_USER ? state.stagedAssignees : state.available
        );
        // Remove the user from the origin and add them to
        // the destination
        originArray.splice(originArray.indexOf(userTag), 1);
        destinationArray.push(userTag);
        state = Object.assign(state, {
          stagedAssignees: getUsersFromTags(
            state.developers,
            ASSIGN_USER ? destinationArray : originArray
          ),
          available: getUsersFromTags(
            state.developers,
            ASSIGN_USER ? originArray : destinationArray
          ),
        });
      },
      prepare(payload: string) {
        return { payload };
      },
    },
    pushLocalChanges: (state) => {
      state = Object.assign(state, {
        currentTicket: Object.assign(state.currentTicket, {
          assignees: state.stagedAssignees,
        }),
      });
    },
  },
});

// export const pushLocalChanges = () => {
//   // make a post request here updating the ticket's assignees
// };

export const {
  toggleDisplay,
  loadTicketById,
  reportLoadingFailure,
  wipePendingCommit,
  moveToNewSet,
  pushLocalChanges,
} = ticketSlice.actions;

export const selectDisplayed = (state: RootState) => state.ticket.displayModal;

export const selectFailures = (state: RootState) => state.ticket.failedImages;

export const selectTicket = (state: RootState) => state.ticket.currentTicket;

export const selectAssignees = (state: RootState) =>
  state.ticket.currentTicket.assignees;

export const selectStagedAssignees = (state: RootState) =>
  state.ticket.stagedAssignees;

export const selectAvailable = (state: RootState) => state.ticket.available;

export default ticketSlice.reducer;
