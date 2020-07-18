import React, { useEffect } from "react";
import {
  User,
  initialState,
  selectAuthSlice,
  finishedLoading,
  loadUser,
} from "./features/auth/AuthSlice";
import { selectSideNavWidth } from "./components/navigation/NavigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { hot } from "react-hot-loader/root";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoadingRing from "./components/loadingRing/LoadingRing";
import Navigation from "./components/navigation/NavigationWrapper";
import Home from "./routes/home/Home";
import GenericRoute from "./routes/GenericRoute";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

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
    }, 1000);
  }, [dispatch]);

  const authSlice = useSelector(selectAuthSlice);
  const sideNavWidth = useSelector(selectSideNavWidth);
  return (
    <Context.Provider value={authSlice}>
      {authSlice.loaded ? (
        <div id="App">
          <BrowserRouter>
            <Navigation authenticated={authSlice.user.authenticated} />
            <ContentWrapper {...{ sideNavWidth }}>
              <Route path="/" exact={true} render={() => <Home />} />
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
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default hot(App);
