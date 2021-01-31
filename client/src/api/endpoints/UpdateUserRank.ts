import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import { updateUser } from "../../flux/slices/userSlice";

export const updateUserRank: Endpoint<number> = {
  normal: (dispatch: Dispatch<any>, state: RootState, rank?: number) => {
    fetch(`${Endpoints.UPDATE_USER}/${state.user.info.tag}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          op: "replace",
          path: "/Rank",
          value: rank,
        },
      ]),
    }).then((res) => {
      if (res.status === 204) {
        toast.success("Successfully updated user's rank.");
        dispatch(
          updateUser(Object.assign({}, state.user.info, { rank: rank }))
        );
      } else
        toast.error(
          "You do not have sufficient permissions to perform this operation."
        );
    });
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {},
};
