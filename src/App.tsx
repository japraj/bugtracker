import React, { useEffect } from "react";
import {
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
} from "./features/auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { hot } from "react-hot-loader/root";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoadingRing from "./components/loadingRing/LoadingRing";
import Navigation from "./components/navigation/NavigationWrapper";
import GenericRoute from "./routes/GenericRoute";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

const Context = React.createContext(initialState);
const serverURL: string = "localhost:5000";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = {
      authenticated: false,
      id: 0,
      permissions: 0,
    };
    // User loading logic
    dispatch(finishedLoading());
    dispatch(loadUser(user));
  }, [dispatch]);

  const authSlice = useSelector(selectAuthSlice);
  return (
    <Context.Provider value={authSlice}>
      {authSlice.loaded ? (
        <div id="App">
          <BrowserRouter>
            <Navigation authenticated={authSlice.user.authenticated} />
            <ContentWrapper {...{ sideNavWidth: 200 }}>
              <Route
                path="/"
                exact={true}
                render={() => <GenericRoute name="Home" />}
              />
              <Route
                path="/login"
                render={() => <GenericRoute name="Login" />}
              />
              <Route
                path="/register"
                render={() => <GenericRoute name="Register" />}
              />
              <ProtectedRoute
                authenticated={authSlice.user.authenticated}
                path="/dashboard"
                component={<GenericRoute name="Dashboard" />}
              />
            </ContentWrapper>
          </BrowserRouter>
        </div>
      ) : (
        <div id="loading">
          <LoadingRing />
        </div>
      )}
    </Context.Provider>
  );
};

const ContentWrapper = styled.main`
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
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default hot(App);
