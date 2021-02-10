import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import { updateUser } from "../../flux/slices/userSlice";
import { updateStoredUser } from "../../flux/slices/contextSlice";
import { updateDemoUser } from "../../flux/slices/demoSlice";

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
        var newUser = Object.assign({}, state.user.info, { rank: rank });
        dispatch(updateStoredUser(newUser));
        dispatch(updateUser(newUser));
      } else
        toast.error(
          "You do not have sufficient permissions to perform this operation."
        );
    });
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState, rank?: number) => {
    toast.success("Successfully updated user's rank.");
    var newUser = Object.assign({}, state.user.info, { rank: rank });
    dispatch(
      updateDemoUser(
        Object.assign({}, newUser, {
          activity: state.user.recentActivity,
          tickets: state.user.tickets,
        })
      )
    );
    dispatch(updateStoredUser(newUser));
    dispatch(updateUser(newUser));
  },
};
