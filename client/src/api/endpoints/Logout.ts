import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import Routes from "../../constants/routes";
import { logout } from "../../flux/slices/authSlice";
import history from "../../routes/history";

export const logoutUser: Endpoint<undefined> = {
  normal: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    fetch(Endpoints.LOGOUT, { method: "POST" })
      .then(() => {
        dispatch(logout());
        history.push(Routes.HOME);
      })
      .catch(() =>
        toast.error("Oops, something went wrong! Please try again.")
      );
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    history.push(Routes.DEMO);
    window.location.reload();
  },
};
