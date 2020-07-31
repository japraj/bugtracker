import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hot } from "react-hot-loader/root";

import {
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
} from "./flux/slices/authSlice";
import { setCollapsedTickets } from "./flux/slices/tableSlice";
import { setRecentActivity } from "./flux/slices/homeSlice";
import { generateNotificationSet, generateTicketSet } from "./seed";
import { User } from "./constants";

import FancyLoading, {
  LoadWrapper,
} from "../components/global/loadingRing/FancyLoading";
import ContentWrapper from "../components/container/contentWrapper";

import Navigation from "../components/global/navigation";
import { selectSideNavWidth } from "./flux/slices/navigationSlice";

import TicketModal from "../components/global/ticket";

import { Router } from "react-router-dom";
import history from "../routes/history";
import Routes from "../routes/Routes";

import "./App.css";
import "../components/global/alert/Alert.css";

const Context = React.createContext(initialState);
// const serverURL: string = "localhost:5000";

export default hot(() => {
  const dispatch = useDispatch();
  const initialLoad = () => {
    let user: User = {
      authenticated: true,
      id: 0,
      notifications: generateNotificationSet(5),
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

    dispatch(setCollapsedTickets(generateTicketSet(20)));
    dispatch(setRecentActivity(generateNotificationSet(10)));
    dispatch(loadUser(user));
    setTimeout(() => dispatch(finishedLoading()), 0);
  };

  React.useEffect(initialLoad, [dispatch]);
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
          <Navigation authenticated={authenticated} />
          <ContentWrapper {...{ sideNavWidth }}>
            <Routes authenticated={authenticated} />
          </ContentWrapper>
          <TicketModal />
        </Router>
      ) : (
        <LoadWrapper>
          <FancyLoading />
        </LoadWrapper>
      )}
    </Context.Provider>
  );
});
