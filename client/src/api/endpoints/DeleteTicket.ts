import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { Notification } from "../../constants/notification";
import { getNextId } from "../../constants/demo";
import { toast } from "react-toastify";
import {
  removeCollapsedTicket,
  harmonizeContext,
  addActivity,
} from "../../flux/slices/contextSlice";
import { removeTicketRefs } from "../../flux/slices/demoSlice";
import { forceCloseDisplays } from "../../flux/slices/ticketSlice";
import { Ticket } from "../../constants/ticket";
import { setRecentActivity } from "../../flux/slices/homeSlice";

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
  demo: (dispatch: Dispatch<Action<any>>, state: RootState) => {
    // store the ticket temporarily so we can use its fields to delete
    const ticket: Ticket = state.ticket.currentTicket;
    // create a deletion activity
    const deltNotification: Notification = {
      id: getNextId(state.context.stores.activity.allKeys),
      ticketId: "",
      date: new Date().toISOString(),
      author: state.authentication.user.info.tag,
      message: 1,
      value: "",
      new: false,
    };
    toast.success(`Successfully deleted issue #${ticket.id}`);
    dispatch(forceCloseDisplays());
    // clean up activity, collapsed tickets, etc
    dispatch(removeCollapsedTicket(ticket.id));
    dispatch(
      removeTicketRefs({ ticketId: ticket.id, activities: ticket.activity })
    );
    // add delete activity
    dispatch(
      setRecentActivity(state.home.recentActivity.concat(deltNotification.id))
    );
    dispatch(addActivity([deltNotification]));
  },
};
