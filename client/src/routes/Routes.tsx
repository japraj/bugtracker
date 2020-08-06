import React from "react";
import ProtectedRoute from "./protectedRoute";
import { Route, Switch } from "react-router-dom";

import Routes from "../app/constants/routes";

// Routes
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
      <Route path={Routes.HOME} exact={true} component={Home} />
      <ProtectedRoute
        requireAuth={true}
        path={Routes.DASHBOARD}
        component={<Dashboard />}
      />
      <ProtectedRoute
        requireAuth={false}
        path={Routes.DEMO}
        component={<DemoLogin />}
      />
      <ProtectedRoute
        requireAuth={false}
        path={Routes.REGISTER}
        component={<Register />}
      />
      <ProtectedRoute
        requireAuth={false}
        path={Routes.LOGIN}
        component={<Login />}
      />
      <ProtectedRoute
        requireAuth={false}
        path={Routes.FORGOT_PASS}
        component={<ForgotPassword />}
      />
      <Route path={`${Routes.RESET_PASS}/:token`} component={ResetPassword} />
      <Route path={`${Routes.USER}/:tag`} component={User} />
      {/* Error Pages */}
      <Route
        path={Routes.LOGIN_REQUIRED}
        render={() => (
          <ErrorPage
            width="660px"
            header="Auth Error"
            bodyText="Sorry, you must be logged in to access that resource. "
            linkText="Go to Login Page."
            linkHref={Routes.LOGIN}
          />
        )}
      />
      <Route
        path={Routes.INVALID_TOKEN}
        render={() => (
          <ErrorPage
            width="660px"
            header="Invalid Token"
            bodyText="Sorry, your token has expired. "
            linkText="Go to Forgot Password Page."
            linkHref={Routes.FORGOT_PASS}
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
            linkHref={Routes.HOME}
          />
        )}
      />
    </Switch>
  );
};
