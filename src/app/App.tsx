import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
  User,
} from "./flux/slices/authSlice";
import { setCollapsedTickets } from "./flux/slices/tableSlice";
import { setRecentActivity } from "./flux/slices/homeSlice";
import { generateNotificationSet, generateTicketSet } from "./seed";

import FancyLoading, {
  LoadWrapper,
} from "../components/global/loadingRing/FancyLoading";
import ContentWrapper from "../components/container/contentWrapper";

import Navigation from "../components/global/navigation";
import { selectSideNavWidth } from "./flux/slices/navigationSlice";

import { Router } from "react-router-dom";
import history from "../routes/history";
import Routes from "../routes/Routes";

import "./App.css";
import "../components/global/alert/Alert.css";

const Context = React.createContext(initialState);
// const serverURL: string = "localhost:5000";

export default () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    let user: User = {
      authenticated: true,
      id: 0,
      notifications: generateNotificationSet(),
      info: {
        profileImg:
          "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia2.s-nbcnews.com%2Fi%2Fstreams%2F2014%2FOctober%2F141022%2F1D274907053597-141022_today-pets-dog-tease-ae.jpg&f=1&nofb=1",
        tag: "Infamous",
        rank: 3,
      },
    };
    // User loading logic; make fetch request to serverURL
    // (must specify the endpoint though), store results
    // in user var. Don't forget to remove the setTimeout!

    dispatch(setCollapsedTickets(generateTicketSet()));
    dispatch(setRecentActivity(generateNotificationSet()));
    dispatch(loadUser(user));
    setTimeout(() => dispatch(finishedLoading()), 2000);
  }, [dispatch]);

  const authSlice = useSelector(selectAuthSlice);
  const authenticated = authSlice.user.authenticated;
  const sideNavWidth = useSelector(selectSideNavWidth);
  return (
    <Context.Provider value={authSlice}>
      {authSlice.loaded ? (
        <Router history={history}>
          {/*
            Navigation is a persistent component, present in all pages, so it is kept
            outside the ContentWrapper. Note that Navigation must be within the Router
            component because it uses a location hook
          */}
          <Navigation authenticated={authSlice.user.authenticated} />
          <ContentWrapper {...{ sideNavWidth }}>
            <Routes authenticated={authenticated} />
          </ContentWrapper>
        </Router>
      ) : (
        <LoadWrapper>
          <FancyLoading />
        </LoadWrapper>
      )}
    </Context.Provider>
  );
};
