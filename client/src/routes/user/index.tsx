import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectElementsByKeys } from "../../flux/slices/contextSlice";
import { loadUser } from "../../flux/slices/userSlice";
import Endpoints from "../../constants/api";
import Page from "./page";

// This is a wrapper for the page component, meant to separate the
// loading of a user from the rendering of the page, ensuring that
// a user is only loaded ONCE, when the client initially opens the
// /user/:tag route. The alternative is that the user is reloaded
// every single time the page re-renders, which would result in
// exponentially more back-end requests and a chance of getting
// caught in an infinite re-render loop.

export default ({ match }: { match: any }) => {
  const dispatch = useDispatch();
  const selectActivity: (keys: string[]) => any[] = useSelector(
    selectElementsByKeys("activity")
  );
  const selectTickets: (keys: string[]) => any[] = useSelector(
    selectElementsByKeys("collapsedTickets")
  );

  // load the user via fetch
  // note: the load user payload requires tickets to be in the form of collapsed
  // tickets while the backend simply returns a list of strings; we must manually
  // get the collapsedTicket objects from the table slice.
  fetch(`${Endpoints.USER_BY_TAG}/${match.params.tag}`, { method: "GET" })
    .then((res) => res.json())
    .then((res: any) =>
      dispatch(
        loadUser({
          info: { tag: res.tag, rank: res.rank, profileImg: res.avatar },
          recentActivity: selectActivity(res.activity),
          tickets: selectTickets(res.tickets),
        })
      )
    )
    .catch(() => dispatch(loadUser(undefined)));
  return <Page />;
};
