import React from "react";
import App from "./App";
import { store } from "./flux/store";
import { Provider } from "react-redux";

// A higher order class component; its sole purpose is to
// force a re-render whenever the viewport is resized.
// The logic was not placed in App.tsx because this is
// not directly related to the routing or authentication
// of the component.

export default class extends React.Component<{}, {}> {
  listener = () => this.forceUpdate();

  componentDidMount = () => window.addEventListener("resize", this.listener);

  componentWillUnmount = () =>
    window.removeEventListener("resize", this.listener);

  render = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
