import Endpoints from "../../constants/api";
import Routes from "../../constants/routes";
import { generateLocalUserFromDTO } from "../../constants/user";
import { loadUser } from "../../flux/slices/authSlice";
import { Notification } from "../../constants/notification";
import { AppThunk } from "../../flux/store";
import history from "../../routes/history";

export const loadSession = (err: () => void): AppThunk => (
  dispatch,
  getState
): void => {
  fetch(Endpoints.LOAD_SESSION, { method: "GET" })
    .then((res) => res.json())
    .then((res: any) => {
      if (res.Tag === undefined && res.status !== undefined) throw new Error();

      const getNotificationsByIds = (ids: number[]): Notification[] => {
        const notifications = getState().context.stores.activity.byKey;
        return ids.map((id: number) => notifications[id.toString()]);
      };

      dispatch(loadUser(generateLocalUserFromDTO(res, getNotificationsByIds)));
      history.push(Routes.HOME);
    })
    .catch(err);
};
