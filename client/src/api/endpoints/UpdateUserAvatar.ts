import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import { updateAvatar } from "../../flux/slices/authSlice";
import { updateStoredUser } from "../../flux/slices/contextSlice";
import { updateUser } from "../../flux/slices/userSlice";

export const updateUserAvatar: Endpoint<undefined> = {
  normal: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    fetch(`${Endpoints.UPDATE_USER}/${state.user.info.tag}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          op: "replace",
          path: "/Avatar",
          value: state.user.stagedUrl,
        },
      ]),
    }).then((res) => {
      if (res.status === 204) {
        var newUser = Object.assign({}, state.user.info, {
          profileImg: state.user.stagedUrl,
        });
        toast.success("Successfully updated avatar.");
        // update user profile page
        dispatch(updateUser(newUser));
        // update context slice
        dispatch(updateStoredUser(newUser));
        // if the client is changing their own avatar,
        // update the sidebar avatar img too
        if (state.authentication.user.info.tag === state.user.info.tag)
          dispatch(updateAvatar(state.user.stagedUrl));
      } else toast.error("Something went wrong");
    });
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {},
};
