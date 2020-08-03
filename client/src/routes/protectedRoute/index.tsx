import React from "react";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../app/flux/slices/authSlice";
import { Route, Redirect } from "react-router-dom";

// A protected route is one which can only be accessed by user who are authenticated
// or unauthenticated; if a user who is unauthenticated tries to access a route that
// requires auth, they are redirected to the /loginRequired page and conversely,
// if an authenticated user tries to access a page that requires requireAuth === false
// then they are redirected to /

// Note that requireAuth does not decide whether or not the rule is enforced; it only
// determines what the rule is. All protected routes enforce the rule regardless of
// the value of requireAuth
export default ({
  requireAuth,
  component,
  path,
}: {
  requireAuth: boolean;
  component: React.ReactNode;
  path: any;
}) => {
  const authenticated: boolean = useSelector(selectAuthenticated);
  return (
    <Route
      path={path}
      render={(props) => {
        return authenticated === requireAuth ? (
          component
        ) : (
          <Redirect to={{ pathname: requireAuth ? "/loginRequired" : "/" }} />
        );
      }}
    />
  );
};
