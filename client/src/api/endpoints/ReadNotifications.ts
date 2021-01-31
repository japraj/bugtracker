import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";

export const readNotifications: Endpoint<undefined> = {
  normal: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    fetch(Endpoints.READ_ALL_NOTIFICATIONS, {
      method: "PATCH",
    }).catch((e) => {
      console.log(e);
    });
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {},
};
