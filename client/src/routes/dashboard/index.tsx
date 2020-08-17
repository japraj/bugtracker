import React from "react";
import {
  DashboardState,
  selectDashboardSlice,
} from "../../flux/slices/dashboardSlice";
import { connect } from "react-redux";
import Page from "./page";

export default connect(selectDashboardSlice)(
  class extends React.Component<DashboardState, {}> {
    shouldComponentUpdate = () => !this.props.loaded;

    render = () => <Page />;
  }
);
