import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hot } from "react-hot-loader/root";

import {
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
} from "../flux/slices/authSlice";
import {
  addCollapsedTickets,
  addUsers,
  addActivity,
  harmonizeContext,
} from "../flux/slices/contextSlice";
import { setRecentActivity, setTotalPages } from "../flux/slices/homeSlice";
//import { generateNotificationSet, generateTicketSet } from "../seed";
import Endpoints from "../constants/api";
import { generateLocalUserFromDTO, getUserFromDTO } from "../constants/user";
import {
  Notification,
  getNotificationFromDTO,
} from "../constants/notification";
import {
  CollapsedTicket,
  getCollapsedTicketFromDTO,
} from "../constants/ticket";

import FancyLoading, {
  LoadWrapper,
} from "../components/global/loadingRing/FancyLoading";
import ContentWrapper from "../components/container/contentWrapper";
import ToastContainer from "../components/global/toastContainer";

import Navigation from "../components/global/navigation";
import { selectSideNavWidth } from "../flux/slices/navigationSlice";

import TicketModal from "../components/global/ticket";

import { Router } from "react-router-dom";
import history from "../routes/history";
import Routes from "../routes/Routes";

import "./App.css";

const Context = React.createContext(initialState);

// note: period is the reciprocal of frequency
// we want to ask the server for updates every 10 minutes
const updatePeriod = 10 * 60 * 1000;
// we want to check if we are ready to ask the server for an update, once a minute
const checkPeriod = 1 * 60 * 1000;

export default hot(() => {
  const dispatch = useDispatch();

  // initial load logic
  React.useEffect(() => {
    fetch(Endpoints.INITIAL_LOAD, { method: "GET" })
      .then((res) => res.json())
      .then((res: any) => {
        const tickets: CollapsedTicket[] = res.tickets.map(
          getCollapsedTicketFromDTO
        );

        dispatch(addCollapsedTickets(tickets));
        dispatch(setTotalPages(Math.ceil(tickets.length / 5)));
        dispatch(addUsers(res.users.map(getUserFromDTO)));

        const notifications: Notification[] = res.activity.map(
          getNotificationFromDTO
        );

        dispatch(addActivity(notifications));
        dispatch(
          setRecentActivity(
            notifications.filter((n) => n.message < 11).map((n) => n.id)
          )
        );
        if (res.session !== null)
          dispatch(
            loadUser(
              generateLocalUserFromDTO(res.session, (ids: number[]) =>
                notifications.filter(
                  (notification) => ids.indexOf(notification.id) !== -1
                )
              )
            )
          );
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(finishedLoading()));

    // Old seeding logic; will not work
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
    // dispatch(loadUser(user));
    // dispatch(setCollapsedTickets(generateTicketSet(20)));
    // dispatch(setRecentActivity(generateNotificationSet(5)));
    // setTimeout(() => dispatch(finishedLoading()), 0);

    const checkForUpdate = () =>
      dispatch(harmonizeContext(false, updatePeriod));

    // subscribe to updates from the server (do the actual update every updatePeriod seconds
    // but check every minute if we are ready)
    setInterval(checkForUpdate, checkPeriod);
  }, [dispatch]);

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
