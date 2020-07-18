import React from "react";
import WidgetWrapper from "../../../components/widget/widgetWrapper/WidgetWrapper";
import WidgetHeader from "../../../components/widget/widgetHeader/WidgetHeader";
import ActivityCell, { Activity } from "./Activity";

export default ({ activitySet }: { activitySet: Activity[] }) => {
  const activityNodes = activitySet.map((activity) => {
    return (
      <ActivityCell
        key={activity.username + activity.timestamp}
        {...{ activity }}
      />
    );
  });
  return (
      <WidgetWrapper>
        <WidgetHeader>
          <h1>Recent Activity</h1>
        </WidgetHeader>
        {activityNodes}
      </WidgetWrapper>
  );
};
