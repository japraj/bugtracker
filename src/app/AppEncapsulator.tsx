import React from "react";
import App from "./App";
import { store } from "./flux/store";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader/root";

// A higher order class component; its sole purpose is to
// force a re-render whenever the viewport is resized.
// The logic was not placed in App.tsx because this is
// not directly related to the routing or authentication
// of the component.
class Encapsulator extends React.Component<{}, {}> {
  componentDidMount = () =>
    window.addEventListener("resize", () => this.forceUpdate());

  render = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default hot(Encapsulator);
