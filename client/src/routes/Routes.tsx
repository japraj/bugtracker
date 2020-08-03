import React from "react";
import ProtectedRoute from "./protectedRoute";
import { Route, Switch } from "react-router-dom";
// Routes
import Unimplemented from "./unimplemented";
import Home from "./home";
import Dashboard from "./dashboard";
import ErrorPage from "./errorPage";
import Login from "./login";
import Register from "./register";
import DemoLogin from "./demoLogin";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./resetPassword";
import User from "./user";

export default () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <ProtectedRoute
        requireAuth={true}
        path="/dashboard"
        component={<Dashboard />}
      />
      <ProtectedRoute
        requireAuth={false}
        path="/demo"
        component={<DemoLogin />}
      />
      <ProtectedRoute
        requireAuth={false}
        path="/register"
        component={<Register />}
      />
      <ProtectedRoute requireAuth={false} path="/login" component={<Login />} />
      <ProtectedRoute
        requireAuth={false}
        path="/forgotPassword"
        component={<ForgotPassword />}
      />
      <Route path="/resetPassword/:token" component={ResetPassword} />
      <Route path="/user/:tag" component={User} />
      <ProtectedRoute
        requireAuth={true}
        path="/dashboard"
        component={<Unimplemented name="Dashboard" />}
      />
      {/* Error Pages */}
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
      <Route
        path="/invalidToken"
        render={() => (
          <ErrorPage
            width="660px"
            header="Invalid Token"
            bodyText="Sorry, your token has expired. "
            linkText="Go to Forgot Password Page."
            linkHref="/forgotPassword"
          />
        )}
      />
      {
        // The route below is special in that if
        // no other route is matched, the user
        // is automatically redirected there.
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
