import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { toast } from "react-toastify";
import {
  getCollapsedTicketFromDTO,
  NewTicket,
  Status,
  Ticket,
} from "../../constants/ticket";
import { Notification } from "../../constants/notification";
import { getNextId } from "../../constants/demo";
import {
  addActivity,
  addCollapsedTickets,
} from "../../flux/slices/contextSlice";
import { addTicket } from "../../flux/slices/demoSlice";
import { setRecentActivity } from "../../flux/slices/homeSlice";

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
      .then((res) => {
        dispatch(addCollapsedTickets([getCollapsedTicketFromDTO(res)]));
        toast.success("Successfully created a ticket!");
      })
      .catch(() =>
        toast.error("Oops! Something went wrong, please try again.")
      );
  },
  demo: (
    dispatch: Dispatch<Action<any>>,
    state: RootState,
    ticket?: NewTicket
  ) => {
    if (!ticket) return;
    // produce a 'created ticket' activity and update stores

    var mappedTicket: Ticket = {
      id: getNextId(state.demo.tickets.allKeys),
      typeLabel: ticket.typeLabel,
      title: ticket.title,
      author: state.authentication.user.info.tag,
      creationDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      description: ticket.description,
      reproducibility: ticket.reproducibility,
      severity: ticket.severity,
      status: Status.unresolved,
      assignees: [],
      imageLinks: ticket.imageLinks,
      activity: [getNextId(state.context.stores.activity.allKeys)],
    };

    var creationActivity: Notification = {
      id: mappedTicket.activity[0],
      ticketId: mappedTicket.id.toString(),
      date: mappedTicket.creationDate,
      author: mappedTicket.author,
      message: 0,
      value: "",
      new: false,
    };

    dispatch(addTicket(mappedTicket));
    dispatch(
      addCollapsedTickets([Object.assign({}, mappedTicket, { comments: 0 })])
    );
    dispatch(addActivity([creationActivity]));
    dispatch(
      setRecentActivity(state.home.recentActivity.concat(creationActivity.id))
    );
    toast.success("Successfully created a ticket!");
  },
};
