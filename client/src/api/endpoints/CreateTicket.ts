import { Action, Dispatch } from "@reduxjs/toolkit";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import { getCollapsedTicketFromDTO, NewTicket } from "../../constants/ticket";
import { addCollapsedTickets } from "../../flux/slices/contextSlice";
import { RootState } from "../../flux/store";

export const createTicket: Endpoint<NewTicket> = {
  normal: (
    dispatch: Dispatch<Action<any>>,
    state: RootState,
    ticket?: NewTicket
  ) => {
    fetch(Endpoints.CREATE_TICKET, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then((res) =>
        dispatch(addCollapsedTickets([getCollapsedTicketFromDTO(res)]))
      )
      .catch(() =>
        toast.error("Oops! Something went wrong, please try again.")
      );
  },
  demo: (
    dispatch: Dispatch<Action<any>>,
    state: RootState,
    ticket?: NewTicket
  ) => {
    // need to add ticket object to local database object
    // and call addTicket() after mapping it to a CollapsedTicket
  },
};
