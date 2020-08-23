import React from "react";
import { Notification, Variant } from "../../../constants/notification";
import NotificationCell from "../notification";
import { NotificationWrapper, EmptyNotificationsBanner } from "./styles";

export default ({
  notifications,
  variant,
  onClick,
}: {
  notifications: Notification[];
  variant: Variant;
  onClick: () => void;
}) => {
  return (
    <NotificationWrapper width={window.innerWidth < 600 ? "90vw" : "500px"}>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCell
            variant={variant}
            onClick={onClick}
            className={`notification ${notification.new ? "new" : ""}`}
            notification={notification}
          />
        ))
      ) : (
        <EmptyNotificationsBanner>
          You have no notifications.
        </EmptyNotificationsBanner>
      )}
    </NotificationWrapper>
  );
};
