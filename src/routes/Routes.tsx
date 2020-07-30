import React from "react";
import ProtectedRoute from "./protectedRoute";
import { Route, Switch } from "react-router-dom";
// Routes
import Unimplemented from "./unimplemented";
import Home from "./home";
import ErrorPage from "./errorPage";
import Login from "./login";
import Register from "./register";

export default ({ authenticated }: { authenticated: boolean }) => {
  return (
    <Switch>
      <Route path="/" exact={true} render={() => <Home />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/register" render={() => <Register />} />
      <ProtectedRoute
        authenticated={authenticated}
        path="/dashboard"
        component={<Unimplemented name="Dashboard" />}
      />
      <ProtectedRoute
        authenticated={authenticated}
        path="/create"
        component={<Unimplemented name="Create" />}
      />
      <Route
        path="/loginRequired"
        render={() => (
          <ErrorPage
            width="660px"
            header="Auth Error"
            bodyText="Sorry, you must be logged in to access that resource. "
            linkText="Go to Login Page."
            linkHref="/login"
          />
        )}
      />
      {
        // This route is special in that if no
        // other route is matched, the user is
        // automatically redirected here.
      }
      <Route
        render={() => (
          <ErrorPage
            width="660px"
            header="404 Error"
            bodyText="Sorry, that page doesn't exist. "
            linkText="Go to Home Page."
            linkHref="/"
          />
        )}
      />
    </Switch>
  );
};
