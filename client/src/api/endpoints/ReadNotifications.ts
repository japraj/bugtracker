import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";

export const readNotifications: Endpoint<undefined> = {
  normal: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    fetch(Endpoints.READ_ALL_NOTIFICATIONS, {
      method: "PATCH",
    }).catch(() => {});
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    // don't need to do anything; it is already taken care of by the authSlice reducer
    toast.success("Cleared notifications!");
  },
};
