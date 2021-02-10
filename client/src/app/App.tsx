import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hot } from "react-hot-loader/root";

import { initialState, selectAuthSlice } from "../flux/slices/authSlice";
import API from "../api";

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

export default hot(() => {
  const dispatch = useDispatch();

  // initial load logic
  React.useEffect(() => {
    dispatch(API.initialLoad());
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
          <Navigation user={authSlice.user} />
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
