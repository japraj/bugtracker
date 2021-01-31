import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import { loadUserByTag } from "../../flux/slices/userSlice";

export const getUserByTag: Endpoint<string> = {
  normal: (dispatch: Dispatch<any>, state: RootState, name?: string) => {
    dispatch(loadUserByTag(name!));
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {},
};
