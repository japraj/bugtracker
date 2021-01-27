import { Action, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../flux/store";
import { Endpoint } from "../";
import Endpoints from "../../constants/api";
import Routes from "../../constants/routes";
import { getTicketFromDTO } from "../../constants/ticket";
import { forceCloseDisplays, loadTicket } from "../../flux/slices/ticketSlice";
import history from "../../routes/history";

export const loadTicketById: Endpoint<string> = {
  normal: (dispatch: Dispatch<Action<any>>, state: RootState, id?: string) => {
    const err: () => void = () => {
      history.push(Routes.DNE404);
      dispatch(forceCloseDisplays());
    };

    if (!id) err();

    fetch(`${Endpoints.TICKET_BY_ID}/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res.id && res.id !== -1)
          dispatch(loadTicket(getTicketFromDTO(res)));
        else err();
      })
      .catch(err);
  },
  demo: (dispatch: Dispatch<Action<any>>, state: RootState, id?: string) => {},
};
