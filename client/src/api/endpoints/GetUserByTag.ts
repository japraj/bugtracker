import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import { loadUserByTag } from "../../flux/slices/userSlice";
import { sortNotifications } from "../../constants/notification";

export const getUserByTag: Endpoint<string> = {
  normal: (dispatch: Dispatch<any>, state: RootState, name?: string) => {
    dispatch(loadUserByTag(name!));
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState, name?: string) => {
    dispatch(
      loadUserByTag.fulfilled(
        Object.assign({}, state.demo.users.byKey[name!], {
          activity: sortNotifications(
            Object.values(state.context.stores.activity.byKey).filter(
              (a) => a.author === name
            ),
            true
          ).map((a) => a.id),
        }),
        "fulfilled",
        "fulfilled"
      )
    );
  },
};
