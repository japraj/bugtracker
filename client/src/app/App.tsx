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
import Endpoints from "./constants/api";
import { User } from "./constants";

import FancyLoading, {
  LoadWrapper,
} from "../components/global/loadingRing/FancyLoading";
import ContentWrapper from "../components/container/contentWrapper";
import ToastContainer from "../components/global/toastContainer";

import Navigation from "../components/global/navigation";
import { selectSideNavWidth } from "./flux/slices/navigationSlice";

import TicketModal from "../components/global/ticket";

import { Router } from "react-router-dom";
import history from "../routes/history";
import Routes from "../routes/Routes";

import "./App.css";

const Context = React.createContext(initialState);

export default hot(() => {
  const dispatch = useDispatch();
  const initialLoad = () => {
    // let user: User = {
    //   authenticated: true,
    //   id: 0,
    //   notifications: generateNotificationSet(5),
    //   info: {
    //     profileImg:
    //       "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia2.s-nbcnews.com%2Fi%2Fstreams%2F2014%2FOctober%2F141022%2F1D274907053597-141022_today-pets-dog-tease-ae.jpg&f=1&nofb=1",
    //     tag: "Spongebob",
    //     rank: Rank.Admin,
    //   },
    // };

    fetch(Endpoints.LOAD_SESSION, { method: "GET" })
      .then((res) => res.json())
      .then((res: any) => {
        console.log(res);
        try {
          if (res.status < 300 && res.status >= 200)
            dispatch(loadUser(Object.assign({}, res)));
        } catch {}
      })
      .catch(() => {});

    fetch(Endpoints.GET_COLLAPSED, { method: "GET" })
      .then((res) => res.json())
      .then((res: any) =>
        dispatch(
          setCollapsedTickets(res.map((dto: any) => Object.assign({}, dto)))
        )
      )
      .catch((err) => console.log(err));

    fetch(Endpoints.GET_ALL_ACTIVITY, { method: "GET" })
      .then((res) => res.json())
      .then((res) =>
        dispatch(
          setRecentActivity(
            res.map((dto: any) =>
              Object.assign(
                {},
                {
                  author: dto.author,
                  date: dto.creationDate,
                  message: dto.type,
                  ticketId: dto.ticketID,
                  new: dto.read,
                }
              )
            )
          )
        )
      )
      .catch((err) => console.log(err))
      .finally(() => dispatch(finishedLoading()));

    // dispatch(loadUser(user));
    // dispatch(setCollapsedTickets(generateTicketSet(20)));
    // dispatch(setRecentActivity(generateNotificationSet(5)));
    // setTimeout(() => dispatch(finishedLoading()), 0);
  };

  React.useEffect(initialLoad, [dispatch]);
  const authSlice = useSelector(selectAuthSlice);
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
          <Navigation />
          <ContentWrapper {...{ sideNavWidth }}>
            <Routes />
          </ContentWrapper>
          <TicketModal />
          <ToastContainer />
        </Router>
      ) : (
        <LoadWrapper>
          <FancyLoading />
        </LoadWrapper>
      )}
    </Context.Provider>
  );
});
