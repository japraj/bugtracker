export const serverURL: string = "/api/";

export const userRoute: string = `${serverURL}users/`;
export const ticketRoute: string = `${serverURL}tickets/`;
export const activityRoute: string = `${serverURL}activity/`;
export const loadRoute: string = `${serverURL}load/`;

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

  INITIAL_LOAD: string;
  SUBSCRIBE: string;
} = {
  USER_BY_TAG: `${userRoute}byTag`,
  GET_ALL_USERS: `${userRoute}getAllUsers`,
  REGISTER: `${userRoute}register`,
  LOGIN: `${userRoute}login`,
  LOGOUT: `${userRoute}logout`,
  UPDATE_USER: `${userRoute}patch`,

  TICKET_BY_ID: `${ticketRoute}byId`,
  GET_COLLAPSED: `${ticketRoute}getCollapsed`,
  CREATE_TICKET: `${ticketRoute}create`,
  UPDATE_TICKET: `${ticketRoute}patch`,
  DELETE_TICKET: `${ticketRoute}delete`,
  ADD_COMMENT: `${ticketRoute}comment`,

  GET_ALL_ACTIVITY: `${activityRoute}getAll`,
  READ_ALL_NOTIFICATIONS: `${activityRoute}readAll`,

  LOAD_SESSION: `${loadRoute}loadSession`,
  INITIAL_LOAD: `${loadRoute}initial`,
  SUBSCRIBE: `${loadRoute}subscribe`,
};

export interface Patch {
  path: string;
  value: string;
}

// we only use 'replace'
const patchToOperation = (patch: Patch): object => {
  patch.path = patch.path.charAt(0) === "/" ? patch.path : `/${patch.path}`;
  return Object.assign({ op: "replace" }, patch);
};

export const generatePatchDoc = (set: Patch[] | Patch): string =>
  JSON.stringify(
    set.constructor === Array
      ? set.map(patchToOperation)
      : [patchToOperation(set as Patch)]
  );

export default Endpoints;
