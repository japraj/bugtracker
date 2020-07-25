import React from "react";
import { Route, Redirect } from "react-router-dom";

// A protected route is one which can only be accessed by authenticated users.
// If an unauthenticated user tries to access one of these, they are redirected
// to the /loginRequired page.
export default ({
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
