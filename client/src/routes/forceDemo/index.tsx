import React from "react";
import { useDispatch } from "react-redux";
import { startDemo } from "../../constants/demo";

// this component forces the user into demo mode (demoLogin requires the user to click a button);
// it is useful for when we want to make sure a user does not accidently end up on another page of the site
// when we wanted them to try the demo.
export default () => {
  const dispatch = useDispatch();
  startDemo(dispatch)();
  return <React.Fragment />;
};
