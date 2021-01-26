/* this module is meant to abstract the interface between the API and the server,
 to allow for seeding/demo users (the goal is to allow users to experience the
 webapp in all its glory [as an admin] without registering an acct and without
 having lasting impacts on the live database) */

// Implementation: API object contains functions as fields; each function
// encapsulates some serverside interaction (in the case of demo users, we
// have a demo branch which effects the expected behaviour on a local database
// object, in the typical case we have an AJAX branch with serverside interaction)

/* NOTES:
 1) the only time a function in the API object should take arguments is if 
    doing so would prevent duplicate selector calls (for example, if we have a 
    component which makes an api call that requires a field of the ContextSlice,
    but the component itself needs that field for rendering too); in all other
    cases, the function should encapsulate those selector calls to reduce bloat
    in our components
 2) there are several endpoints not abstracted here: login, register, loadSession,
    initialLoad, subscribe - most of these are simply disabled in demo mode (there
    is no special branching logic associated with them) so their inclusion here 
    would only serve to unnecessarily increase complexity. The API abstraction was
    added near the end of development which is another reason for this inconsistency;
    it is simpler and easier to leave those api calls as they are instead of aiming
    for 100% encapsulation of serverside interactions with this module
*/

interface API {
  // ticket/comments
  createTicket: () => void;
  loadTicketById: () => void;
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
  createTicket: () => {},
  loadTicketById: () => {},
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
