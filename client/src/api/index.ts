import { Action, Dispatch } from "@reduxjs/toolkit";
import { NewTicket } from "../constants/ticket";
import { AppThunk, RootState } from "../flux/store";
import { createTicket } from "./endpoints/CreateTicket";
import { loadTicketById } from "./endpoints/LoadTicketById";
/* 
    Purpose: this module is meant to abstract the interface between the API and the server,
    to allow for seeding/demo users (the goal is to allow users to experience the
    webapp in all its glory [as an admin] without registering an acct and without
    having lasting impacts on the live database) 

    Implementation: API object contains action creators as fields; each action creator
    encapsulates some serverside interaction, with a demo branch and a normal branch
    (the branch selection is automatically handled) - the demo branch is meant
    to hold interactions with some serverside object while the normal branch has AJAX calls

    Usage Example: 
        
        const ticket: NewTicket = useSelector(selectTicket)
        const dispatch: Dispatch<Action<any>> = useDispatch()
        dispatch(API.createTicket(ticket));

    Note: there are several endpoints not abstracted here: login, register, 
    loadSession, initialLoad, subscribe - most of these are simply disabled in demo mode
    (there is no special branching logic associated with them) so their inclusion here 
    would only serve to unnecessarily increase complexity. The API abstraction was
    added near the end of development which is another reason for this inconsistency;
    it is simpler and easier to leave those api calls as they are instead of aiming
    for 100% encapsulation of serverside interactions with this module
*/

type EndpointKey<T> = (
  dispatch: Dispatch<Action<any>>,
  state: RootState,
  t?: T
) => void;

export interface Endpoint<T> {
  normal: EndpointKey<T>;
  demo: EndpointKey<T>;
}

const selectBranch = <T>(endpoint: Endpoint<T>) => (t?: T): AppThunk => (
  dispatch,
  getState
) => {
  const state: RootState = getState();
  const branch: EndpointKey<T> =
    state.authentication.loaded && false ? endpoint.demo : endpoint.normal;
  return branch(dispatch, state, t);
};

interface API {
  // ticket/comments
  createTicket: (arg: NewTicket) => AppThunk;
  loadTicketById: (arg: string) => void;
  updateTicket: () => void;
  addComment: () => void;
  deleteTicket: () => void;
  // user
  loadUserByTag: () => void;
  updateUserRank: () => void;
  updateUserAvatar: () => void;
  // local client
  logout: () => void;
  readNotifications: () => void;
}

const api: API = {
  // ticket/comments
  createTicket: selectBranch(createTicket),
  loadTicketById: selectBranch(loadTicketById),
  updateTicket: () => {},
  addComment: () => {},
  deleteTicket: () => {},
  // user
  loadUserByTag: () => {},
  updateUserRank: () => {},
  updateUserAvatar: () => {},
  // local client
  logout: () => {},
  readNotifications: () => {},
};

export default api;
