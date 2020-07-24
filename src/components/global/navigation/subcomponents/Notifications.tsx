import React from "react";
import { ModalContentWrapper } from "../../../container/modalContent/ModalContent";
import { Notification } from "../../../../app/flux/auth/authSlice";
import NotificationCell from "../../notification/Notification";
import styled from "styled-components";

export default ({
  notifications,
  onRedirect,
}: {
  notifications: Notification[];
  onRedirect: () => void;
}) => {
  return (
    <NotificationWrapper width={window.innerWidth < 600 ? "90vw" : "500px"}>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCell
            onRedirect={onRedirect}
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

const NotificationWrapper = styled(ModalContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  jutsify-content: center;

  .notification {
    padding-left: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
  }

  .new {
    background-color: var(--transparent-highlight);
  }
`;

const EmptyNotificationsBanner = styled.h1`
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0 50vh;
  height: 3rem;
  width: 100%;
  font-style: italic;
`;
