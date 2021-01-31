import { AppThunk } from "../../flux/store";
import Endpoints from "../../constants/api";
import {
  Notification,
  getNotificationFromDTO,
} from "../../constants/notification";
import {
  CollapsedTicket,
  getCollapsedTicketFromDTO,
} from "../../constants/ticket";
import { getUserFromDTO, generateLocalUserFromDTO } from "../../constants/user";
import { loadUser, finishedLoading } from "../../flux/slices/authSlice";
import {
  addCollapsedTickets,
  addUsers,
  addActivity,
  harmonizeContext,
} from "../../flux/slices/contextSlice";
import { setTotalPages, setRecentActivity } from "../../flux/slices/homeSlice";

// note: period is the reciprocal of frequency
// we want to ask the server for updates every 10 minutes
const updatePeriod = 10 * 60 * 1000;
// we want to check if we are ready to ask the server for an update, once a minute
const checkPeriod = 1 * 60 * 1000;

export const initialLoad = (): AppThunk => (dispatch, getState): void => {
  fetch(Endpoints.INITIAL_LOAD, { method: "GET" })
    .then((res) => res.json())
    .then((res: any) => {
      const tickets: CollapsedTicket[] = res.tickets.map(
        getCollapsedTicketFromDTO
      );

      dispatch(addCollapsedTickets(tickets));
      dispatch(setTotalPages(Math.ceil(tickets.length / 5)));
      dispatch(addUsers(res.users.map(getUserFromDTO)));

      const notifications: Notification[] = res.activity.map(
        getNotificationFromDTO
      );

      dispatch(addActivity(notifications));
      dispatch(
        setRecentActivity(
          notifications.filter((n) => n.message < 11).map((n) => n.id)
        )
      );
      if (res.session !== null)
        dispatch(
          loadUser(
            generateLocalUserFromDTO(res.session, (ids: number[]) =>
              notifications.filter(
                (notification) => ids.indexOf(notification.id) !== -1
              )
            )
          )
        );
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(finishedLoading()));

  const checkForUpdate = () => dispatch(harmonizeContext(false, updatePeriod));

  // subscribe to updates from the server (do the actual update every updatePeriod seconds
  // but check every minute if we are ready)
  setInterval(checkForUpdate, checkPeriod);
};
