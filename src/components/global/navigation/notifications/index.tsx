import React from "react";
import { Notification } from "../../../../app/flux/slices/authSlice";
import NotificationCell from "../../notification";
import { NotificationWrapper, EmptyNotificationsBanner } from "./styles";

export default ({
  notifications,
  onClick,
}: {
  notifications: Notification[];
  onClick: () => void;
}) => {
  return (
    <NotificationWrapper width={window.innerWidth < 600 ? "90vw" : "500px"}>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCell
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
