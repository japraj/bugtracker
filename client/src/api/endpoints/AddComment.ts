import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import { Notification } from "../../constants/notification";
import { getNextId } from "../../constants/demo";
import { toast } from "react-toastify";
import {
  addActivity,
  addCollapsedTickets,
  harmonizeContext,
} from "../../flux/slices/contextSlice";
import { addComment } from "../../flux/slices/ticketSlice";
import { addTicket, updateUserActivity } from "../../flux/slices/demoSlice";
import { setRecentActivity } from "../../flux/slices/homeSlice";

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
        toast.success("Successfully added a comment!");
      })
      .catch((e) => {
        toast.error("Error, please try again.");
      });
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState, value?: string) => {
    // create comment object
    var activity: Notification = {
      id: getNextId(state.context.stores.activity.allKeys),
      ticketId: state.ticket.currentTicket.id.toString(),
      date: new Date().toISOString(),
      author: state.authentication.user.info.tag,
      message: 2,
      value: value!,
      new: false,
    };
    // update stores
    dispatch(addComment(activity.id));
    dispatch(
      addTicket(
        Object.assign({}, state.ticket.currentTicket, {
          activity: state.ticket.currentTicket.activity.concat(activity.id),
          updateDate: new Date().toISOString(),
        })
      )
    );
    dispatch(updateUserActivity([activity.id]));
    dispatch(
      addCollapsedTickets([
        Object.assign({}, state.ticket.currentTicket, {
          updateDate: new Date().toISOString(),
          comments:
            state.context.stores.collapsedTickets.byKey[
              state.ticket.currentTicket.id
            ].comments + 1,
        }),
      ])
    );
    dispatch(addActivity([activity]));
    dispatch(setRecentActivity(state.home.recentActivity.concat(activity.id)));
    toast.success("Successfully added a comment!");
  },
};
