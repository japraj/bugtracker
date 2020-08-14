export const serverURL: string = "https://localhost:6000/api/";

export const userRoute: string = `${serverURL}users/`;
export const ticketRoute: string = `${serverURL}tickets/`;
export const activityRoute: string = `${serverURL}activity/`;

const Endpoints: object = {
  USER_BY_TAG: `${userRoute}byTag`,
  REGISTER: `${userRoute}register`,
  LOGIN: `${userRoute}login`,
  LOGOUT: `${userRoute}logout`,
  UPDATE_USER: `${userRoute}patch`,

  TICKET_BY_ID: `${ticketRoute}byId`,
  GET_COLLAPSED: `${ticketRoute}getCollapsed`,
  CREATE_TICKET: `${ticketRoute}create`,
  UPDATE_TICKET: `${ticketRoute}patch`,
  DELETE_TICKET: `${ticketRoute}delete`,
  ADD_COMMENT: `${ticketRoute}addComment`,

  GET_ALL_ACTIVITY: `${activityRoute}getAll`,
  READ_ALL_NOTIFICATIONS: `${activityRoute}readAll`,
};

export default Endpoints;
