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
import { DataSet, arrayToNormalized } from "../../seed";

export interface Normalized<T> {
  byKey: {
    [key: string]: T;
  };
  allKeys: string[];
}

export const initialNormalized: Normalized<any> = {
  byKey: {},
  allKeys: [],
};

export interface ContextState {
  lastUpdate: string;
  stores: {
    collapsedTickets: Normalized<CollapsedTicket>;
    users: Normalized<UserInfo>;
    activity: Normalized<Notification>;
  };
}

export const initialState: ContextState = {
  lastUpdate: new Date(0).toISOString(),
  stores: {
    collapsedTickets: initialNormalized,
    users: initialNormalized,
    activity: initialNormalized,
  },
};

const newReducer = <T extends CollapsedTicket | UserInfo | Notification>(
  origin: keyof ContextState["stores"],
  keyProp: string
) => {
  return (state: ContextState, action: PayloadAction<T[]>) => {
    if (action.payload.length === 0) return;
    var normalized: Normalized<any> = state.stores[origin];
    action.payload.forEach((element: any) => {
      normalized.byKey[element[keyProp]] = element;
      if (normalized.allKeys.indexOf(element[keyProp].toString()) === -1)
        normalized.allKeys.push(element[keyProp].toString());
    });
    state.lastUpdate = new Date().toISOString();
    state.stores[origin] = Object.assign(state.stores[origin], normalized);
  };
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    addCollapsedTickets: newReducer<CollapsedTicket>("collapsedTickets", "id"),
    addUsers: newReducer<UserInfo>("users", "tag"),
    addActivity: newReducer<Notification>("activity", "id"),
    removeCollapsedTicket: (state, action: PayloadAction<number>) => {
      const index = state.stores.collapsedTickets.allKeys.indexOf(
        action.payload.toString()
      );
      if (index === -1) return;
      state.stores.collapsedTickets.allKeys.splice(index, 1);
      delete state.stores.collapsedTickets.byKey[action.payload.toString()];
    },
    updateStoredUser: (state, action: PayloadAction<UserInfo>) => {
      state.stores.users.byKey[action.payload.tag] = action.payload;
    },
    updateTime: (state) => {
      state.lastUpdate = new Date().toISOString();
    },
    seedData: (state, action: PayloadAction<DataSet>) => {
      state = Object.assign(state, {
        stores: {
          collapsedTickets: arrayToNormalized(
            action.payload.tickets.map((t) => {
              return {
                id: t.id,
                typeLabel: t.typeLabel,
                title: t.title,
                author: t.author,
                creationDate: t.creationDate,
                updateDate: t.updateDate,
                severity: t.severity,
                status: t.status,
                comments: t.activity.reduce((totalComments, activityId) => {
                  // find the notification with id activityId and check if it is the comment type
                  // if it is the comment type, add 1 to total comments; else do not change it
                  return action.payload.activity.find(
                    (a) => a.id === activityId
                  )!.message === 2
                    ? totalComments + 1
                    : totalComments;
                }, 0),
              };
            }),
            "id"
          ),
          users: arrayToNormalized(
            action.payload.users.map((u) => {
              return {
                tag: u.tag,
                profileImg: u.profileImg,
                rank: u.rank,
              };
            }),
            "tag"
          ),
          activity: arrayToNormalized(action.payload.activity, "id"),
        },
      });
    },
  },
});

export const {
  addCollapsedTickets,
  addUsers,
  addActivity,
  removeCollapsedTicket,
  updateTime,
  updateStoredUser,
  seedData,
} = contextSlice.actions;

// The below 'selectors' actually return selectors! they are meant
// to be called like so: useSelector(selectElementByKey("foo"));
// instead of like useSelector(selectElementByKey);

export const selectElementByKey = (origin: keyof ContextState["stores"]) => (
  state: RootState
): ((key: string) => any) => (key: string) =>
  state.context.stores[origin].byKey[key];

export const selectAllElements = (origin: keyof ContextState["stores"]) => (
  state: RootState
): any[] =>
  state.context.stores[origin].allKeys.map(
    (key) => state.context.stores[origin].byKey[key]
  );

export const selectElementsByKeys = (origin: keyof ContextState["stores"]) => (
  state: RootState
): ((keys: string[]) => any[]) => (keys: string[]) =>
  keys
    .filter((key) => state.context.stores[origin].allKeys.indexOf(key) !== -1)
    .map((key) => state.context.stores[origin].byKey[key]);

// Update the local stores based on the server
export const harmonizeContext = (
  forceUpdate: boolean,
  updatePeriod?: number
): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();
  // if demoMode, we do not want the harmonizer to mess up our state so kill the execution
  if (state.demo.demoMode) return;

  const lastUpdate: Date = new Date(state.context.lastUpdate);
  updatePeriod = updatePeriod ? updatePeriod : 0;
  if (forceUpdate || new Date().getTime() - lastUpdate.getTime() > updatePeriod)
    fetch(`${Endpoints.SUBSCRIBE}/${lastUpdate.toISOString()}`, {
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
            if (!users.length && !activity.length && !tickets.length)
              dispatch(updateTime());
          } catch {}
      })
      .catch();
};

export default contextSlice.reducer;
