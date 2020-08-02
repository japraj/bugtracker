import React from "react";
import {
  DashboardState,
  selectDashboardSlice,
} from "../../app/flux/slices/dashboardSlice";
import { connect } from "react-redux";
import Page from "./page";

export default connect(selectDashboardSlice)(
  class extends React.Component<DashboardState, {}> {
    shouldComponentUpdate = () => {
      return !this.props.loaded;
    };

    render = () => <Page />;
  }
);
