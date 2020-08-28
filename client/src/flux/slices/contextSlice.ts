import { RootState, AppThunk } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollapsedTicket } from "../../constants/ticket";
import { UserInfo, getUserFromDTO } from "../../constants/user";
import {
  Notification,
  getNotificationFromDTO,
} from "../../constants/notification";
import Endpoints from "../../constants/api";
import { getCollapsedTicketFromDTO } from "../../constants/ticket";

interface Normalized<T> {
  byKey: {
    [key: string]: T;
  };
  allKeys: string[];
}

const initialNormalized: Normalized<any> = {
  byKey: {},
  allKeys: [],
};

interface ContextState {
  collapsedTickets: Normalized<CollapsedTicket>;
  users: Normalized<UserInfo>;
  activity: Normalized<Notification>;
}

export const initialState: ContextState = {
  collapsedTickets: initialNormalized,
  users: initialNormalized,
  activity: initialNormalized,
};

const newReducer = <T extends CollapsedTicket | UserInfo | Notification>(
  origin: keyof ContextState,
  keyProp: string
) => {
  return (state: ContextState, action: PayloadAction<T[]>) => {
    if (action.payload.length === 0) return;
    var normalized: Normalized<any> = state[origin];
    action.payload.forEach((element: any) => {
      normalized.byKey[element[keyProp]] = element;
      if (normalized.allKeys.indexOf(element[keyProp].toString()) === -1)
        normalized.allKeys.push(element[keyProp].toString());
    });
    state[origin] = Object.assign(state[origin], normalized);
  };
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    addCollapsedTickets: newReducer<CollapsedTicket>("collapsedTickets", "id"),
    addUsers: newReducer<UserInfo>("users", "tag"),
    addActivity: newReducer<Notification>("activity", "id"),
  },
});

export const {
  addCollapsedTickets,
  addUsers,
  addActivity,
} = contextSlice.actions;

// The below 'selectors' actually return selectors! they are meant
// to be called like so: useSelector(selectElementByKey("foo"));
// instead of like useSelector(selectElementByKey);

export const selectElementByKey = (origin: keyof ContextState) => (
  state: RootState
): ((key: string) => any) => (key: string) => state.context[origin].byKey[key];

export const selectAllElements = (origin: keyof ContextState) => (
  state: RootState
): any[] =>
  state.context[origin].allKeys.map((key) => state.context[origin].byKey[key]);

export const selectElementsByKeys = (origin: keyof ContextState) => (
  state: RootState
): ((keys: string[]) => any[]) => (keys: string[]) =>
  state.context[origin].allKeys
    .filter((key) => keys.indexOf(key) !== -1)
    .map((key) => state.context[origin].byKey[key]);

// Update the local stores based on the server
export const harmonizeContext = (): AppThunk => (dispatch) => {
  fetch(Endpoints.SUBSCRIBE, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res: any) => {
      if (res.status === undefined)
        try {
          const tickets: CollapsedTicket[] = res.tickets.map(
            getCollapsedTicketFromDTO
          );
          const activity: Notification[] = res.activity.map(
            getNotificationFromDTO
          );
          const users: UserInfo[] = res.users.map(getUserFromDTO);

          if (tickets.length > 0) dispatch(addCollapsedTickets(tickets));
          if (activity.length > 0) dispatch(addActivity(activity));
          if (users.length > 0) dispatch(addUsers(users));
        } catch {}
    })
    .catch();
};

export default contextSlice.reducer;
