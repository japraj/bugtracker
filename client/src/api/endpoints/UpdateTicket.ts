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
import {
  harmonizeContext,
  addCollapsedTickets,
} from "../../flux/slices/contextSlice";

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
  ) => {},
};
