export const serverURL: string = "/api/";

export const userRoute: string = `${serverURL}users/`;
export const ticketRoute: string = `${serverURL}tickets/`;
export const activityRoute: string = `${serverURL}activity/`;

const Endpoints: {
  USER_BY_TAG: string;
  GET_ALL_USERS: string;
  REGISTER: string;
  LOGIN: string;
  LOAD_SESSION: string;
  LOGOUT: string;
  UPDATE_USER: string;

  TICKET_BY_ID: string;
  GET_COLLAPSED: string;
  CREATE_TICKET: string;
  UPDATE_TICKET: string;
  DELETE_TICKET: string;
  ADD_COMMENT: string;

  GET_ALL_ACTIVITY: string;
  READ_ALL_NOTIFICATIONS: string;
} = {
  USER_BY_TAG: `${userRoute}byTag`,
  GET_ALL_USERS: `${userRoute}getAllUsers`,
  REGISTER: `${userRoute}register`,
  LOGIN: `${userRoute}login`,
  LOAD_SESSION: `${userRoute}loadSession`,
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
