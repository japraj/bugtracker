import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
} from "./flux/auth/authSlice";
import { hot } from "react-hot-loader/root";
import FancyLoading from "../components/misc/loadingRing/FancyLoading";

import Navigation from "../components/global/navigation/NavigationWrapper";
import { selectSideNavWidth } from "../components/global/navigation/navigationSlice";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import GenericRoute from "../routes/GenericRoute";
import Home from "../routes/home/Home";
import FourZeroFour from "../routes/404/404";

import styled from "styled-components";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "../components/misc/alert/Alert.css";

const Context = React.createContext(initialState);
const serverURL: string = "localhost:5000";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let user: User = {
      authenticated: false,
      id: 0,
      permissions: 0,
    };
    // User loading logic; make fetch request to serverURL
    // (must specify the endpoint though), store results
    // in user var, call the below functions make sure to
    // remove the setTimeout; it is only present to simulate
    // the delay generated by a server request!

    setTimeout(() => {
      dispatch(finishedLoading());
      dispatch(loadUser(user));
    }, 2000);
  }, [dispatch]);

  const authSlice = useSelector(selectAuthSlice);
  const authenticated = authSlice.user.authenticated;
  const sideNavWidth = useSelector(selectSideNavWidth);
  return (
    <Context.Provider value={authSlice}>
      {authSlice.loaded ? (
        <div id="App">
          <BrowserRouter>
            <Navigation authenticated={authSlice.user.authenticated} />
            <ContentWrapper {...{ sideNavWidth }}>
              <Switch>
                <Route path="/" exact={true} render={() => <Home />} />
                <Route
                  path="/login"
                  render={() => <GenericRoute name="Login" />}
                />
                <Route
                  path="/register"
                  render={() => <GenericRoute name="Register" />}
                />
                <Route
                  path="/loginRequired"
                  render={() => <GenericRoute name="Login to view this page" />}
                />
                <ProtectedRoute
                  authenticated={authenticated}
                  path="/dashboard"
                  component={<GenericRoute name="Dashboard" />}
                />
                <ProtectedRoute
                  authenticated={authenticated}
                  path="/create"
                  component={<GenericRoute name="Create" />}
                />
                <Route render={() => <FourZeroFour />} />
              </Switch>
            </ContentWrapper>
          </BrowserRouter>
        </div>
      ) : (
        <div id="loading">
          <FancyLoading />
        </div>
      )}
    </Context.Provider>
  );
};

const ContentWrapper = styled.main`
  padding: 2rem 40px 8px 40px;
  margin: var(--nav-height) 0 0
    ${(props: { sideNavWidth: number }) => props.sideNavWidth}px;
  height: 100%;

  @media (max-width: 1100px) {
    margin-left: 0;
  }
`;

// A protected route is one which can only be accessed by authenticated users.
const ProtectedRoute = ({
  authenticated,
  component,
  path,
}: {
  authenticated: boolean;
  component: React.ReactNode;
  path: any;
}) => {
  return (
    <Route
      path={path}
      render={(props) => {
        return authenticated ? (
          component
        ) : (
          <Redirect to={{ pathname: "/loginRequired" }} />
        );
      }}
    />
  );
};

export default hot(App);
