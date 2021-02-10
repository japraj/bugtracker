import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import API, { Endpoint } from "../";
import Endpoints, { generatePatchDoc, Patch } from "../../constants/api";
import { toast } from "react-toastify";
import {
  EditedTicket,
  getCollapsedTicketFromDTO,
  Ticket,
} from "../../constants/ticket";
import { Notification } from "../../constants/notification";
import { getNextId } from "../../constants/demo";
import {
  harmonizeContext,
  addCollapsedTickets,
  addActivity,
} from "../../flux/slices/contextSlice";
import { addTicket, updateUserActivity } from "../../flux/slices/demoSlice";
import { setRecentActivity } from "../../flux/slices/homeSlice";
import { loadTicket } from "../../flux/slices/ticketSlice";

interface Map {
  [key: string]: string;
}

const generateMap = (obj: object): Map => {
  var map: Map = {};
  const keySet: string[] = Object.keys(obj);
  const valueSet: string[] = Object.values(obj);
  keySet.forEach((key: string, index: number) => (map[key] = valueSet[index]));
  return map;
};

const mapModelsToPatchArray = (
  editedModel: EditedTicket,
  persistentModel: Ticket
): Patch[] => {
  var patchSet: Patch[] = [];
  const editedMap: Map = generateMap(editedModel);
  const persistentMap: Map = generateMap(persistentModel);

  Object.keys(editedModel).forEach((key: string) => {
    if (editedMap[key] !== persistentMap[key])
      patchSet.push({ path: key, value: editedMap[key] });
  });
  return patchSet;
};

export const updateTicket: Endpoint<EditedTicket> = {
  normal: (
    dispatch: Dispatch<any>,
    state: RootState,
    editedTicket?: EditedTicket
  ) => {
    fetch(`${Endpoints.UPDATE_TICKET}/${state.ticket.currentTicket.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: generatePatchDoc(
        mapModelsToPatchArray(editedTicket!, state.ticket.currentTicket)
      ),
    })
      .then((res: any) => {
        if (res.status !== 204) return;
        dispatch(harmonizeContext(true));
        dispatch(
          addCollapsedTickets([
            getCollapsedTicketFromDTO(
              Object.assign({}, editedTicket, {
                updateDate: new Date().toISOString(),
              })
            ),
          ])
        );
        dispatch(API.loadTicketById(state.ticket.currentTicket.id.toString()));
        toast.success("Saved changes.");
      })
      .catch(() =>
        toast.error("Oops! Something went wrong, please try again.")
      );
  },
  demo: (
    dispatch: Dispatch<Action<any>>,
    state: RootState,
    editedTicket?: EditedTicket
  ) => {
    // generate an activity for each change in the PatchArray, and update stores
    const patches: Patch[] = mapModelsToPatchArray(
      editedTicket!,
      state.ticket.currentTicket
    );
    var activities: Notification[] = [];
    var activityId = getNextId(state.context.stores.activity.allKeys);
    patches.forEach((patch: Patch) => {
      var activity: Notification = {
        id: activityId,
        ticketId: state.ticket.currentTicket.id.toString(),
        date: new Date().toISOString(),
        author: state.authentication.user.info.tag,
        message: 0,
        value: patch.value,
        new: false,
      };

      // set the message field value based on the type of the update
      switch (patch.path.toLowerCase()) {
        case "title":
          activity.message = 3;
          break;
        case "description":
          activity.message = 4;
          break;
        case "status":
          activity.message = 5;
          break;
        case "severity":
          activity.message = 6;
          break;
        case "reproducibility":
          activity.message = 7;
          break;
        case "typelabel":
          activity.message = 8;
          break;
        case "assignees":
          activity.message = 9;
          break;
        case "imagelinks":
          activity.message = 10;
          break;
      }

      activities.push(activity);
      activityId++;
    });
    var ids: number[] = activities.map((a) => a.id);

    const newTicket: Ticket = Object.assign(
      {},
      state.ticket.currentTicket,
      editedTicket,
      {
        activity: state.ticket.currentTicket.activity.concat(ids),
        updateDate: new Date().toISOString(),
      }
    );
    // update local user's activity, update recent activity (home page), update demo/context stores,
    // update currently loaded ticket
    dispatch(updateUserActivity(ids));
    dispatch(addTicket(newTicket));
    dispatch(
      addCollapsedTickets([
        Object.assign(
          {},
          state.context.stores.collapsedTickets.byKey[
            state.ticket.currentTicket.id
          ],
          newTicket
        ),
      ])
    );
    dispatch(addActivity(activities));
    dispatch(
      setRecentActivity(
        state.home.recentActivity.concat(ids.length ? ids[0] : [])
      )
    );
    dispatch(loadTicket(newTicket));
    toast.success("Saved changes.");
  },
};
