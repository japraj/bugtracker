import React from "react";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget/Widget";
import ActivityCell, { Activity } from "./Activity";

export default ({ activitySet }: { activitySet: Activity[] }) => {
  const activityNodes = activitySet
    .filter((activity, index) => index < 5)
    .map((activity) => {
      return (
        <WidgetSection>
          <ActivityCell key={activity.userInfo.userTag} {...{ activity }} />
        </WidgetSection>
      );
    });
  return (
    <WidgetWrapper style={{ maxWidth: "400px", alignSelf: "flex-start" }}>
      <WidgetHeader>
        <i className="fa fa-calendar" aria-hidden="true" />
        <h1>Recent Activity</h1>
      </WidgetHeader>
      {activityNodes}
    </WidgetWrapper>
  );
};
