import React from "react";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget/Widget";
import ActivityCell, { Activity } from "./Activity";
import Icon from "@material-ui/core/Icon";

export default ({
  activitySet,
  className,
}: {
  activitySet: Activity[];
  className: string;
}) => {
  const activityNodes = activitySet
    .filter((activity, index) => index < 5)
    .map((activity, index) => {
      return (
        <WidgetSection key={activity.userInfo.userTag + index}>
          <ActivityCell {...{ activity }} />
        </WidgetSection>
      );
    });
  return (
    <WidgetWrapper className={className}>
      <WidgetHeader>
        <Icon className="inline-icon">today</Icon>
        <h1>Recent Activity</h1>
      </WidgetHeader>
      {activityNodes}
    </WidgetWrapper>
  );
};
