import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authenticate,
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
} from "./flux/slices/authSlice";
import FancyLoading, {
  LoadWrapper,
} from "../components/global/loadingRing/FancyLoading";

import Navigation from "../components/global/navigation";
import { selectSideNavWidth } from "./flux/slices/navigationSlice";

import { Router } from "react-router-dom";
import history from "../routes/history";
import Routes from "../routes/Routes";
import ContentWrapper from "../components/container/contentWrapper";

import "./App.css";
import "../components/global/alert/Alert.css";

const Context = React.createContext(initialState);
// const serverURL: string = "localhost:5000";

export default () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUser(authenticate()));
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
