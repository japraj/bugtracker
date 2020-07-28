import React from "react";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget";
import { Notification } from "../../../app/constants";
import NotificationCell from "../../../components/global/notification";
import Icon from "@material-ui/core/Icon";

export default ({
  notificationSet,
  className,
}: {
  notificationSet: Notification[];
  className: string;
}) => {
  const notificationNodes = notificationSet
    .filter((notification, index) => index < 5)
    .map((notification, index) => {
      return (
        <WidgetSection key={notification.author.tag + index}>
          <NotificationCell
            commentVariant={false}
            onClick={() => {}}
            className=""
            {...{ notification }}
          />
        </WidgetSection>
      );
    });
  return (
    <WidgetWrapper className={className}>
      <WidgetHeader>
        <Icon className="inline-icon">today</Icon>
        <h1>Recent Activity</h1>
      </WidgetHeader>
      {notificationNodes}
    </WidgetWrapper>
  );
};
