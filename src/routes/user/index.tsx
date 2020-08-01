import React from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../app/flux/slices/userSlice";
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
  dispatch(loadUser(match.params.tag));
  return <Page />;
};
