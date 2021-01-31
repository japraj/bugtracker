import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import { harmonizeContext } from "../../flux/slices/contextSlice";
import { addComment } from "../../flux/slices/ticketSlice";

export const newComment: Endpoint<string> = {
  normal: (dispatch: Dispatch<any>, state: RootState, value?: string) => {
    fetch(Endpoints.ADD_COMMENT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
        ticketId: state.ticket.currentTicket.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(addComment(res.id));
        dispatch(harmonizeContext(true));
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error, please try again.");
      });
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {},
};
