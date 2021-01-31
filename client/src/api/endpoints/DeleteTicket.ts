import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import {
  removeCollapsedTicket,
  harmonizeContext,
} from "../../flux/slices/contextSlice";
import { forceCloseDisplays } from "../../flux/slices/ticketSlice";

export const deleteTicket: Endpoint<undefined> = {
  normal: (dispatch: Dispatch<any>, state: RootState) => {
    const id: number = state.ticket.currentTicket.id;
    fetch(`${Endpoints.DELETE_TICKET}/${id}`, {
      method: "DELETE",
    })
      .then((res: any) => {
        if (res.status !== 204) return;
        dispatch(forceCloseDisplays());
        dispatch(removeCollapsedTicket(id));
        dispatch(harmonizeContext(true));
        toast.success(`Successfully deleted issue #${id}`);
      })
      .catch(() =>
        toast.error("Oops! Something went wrong, please try again.")
      );
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {},
};
