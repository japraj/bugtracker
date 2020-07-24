import React from "react";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget/Widget";
import { Notification } from "../../../app/flux/auth/authSlice";
import ActivityCell from "./Activity";
import Icon from "@material-ui/core/Icon";

export default ({
  activitySet,
  className,
}: {
  activitySet: Notification[];
  className: string;
}) => {
  const activityNodes = activitySet
    .filter((activity, index) => index < 5)
    .map((activity, index) => {
      return (
        <WidgetSection key={activity.author.tag + index}>
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
