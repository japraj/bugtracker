import React from "react";
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

const NotificationWrapper = styled.div`
  position: absolute;
  top: 10vh;
  width: ${(props: { width: string }) => props.width};
  left: calc(50% - calc(${(props: { width: string }) => props.width} / 2));
  height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  jutsify-content: center;

  .notification {
    padding-left: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .new {
    background-color: var(--transparent-highlight);
  }

  ::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.5);
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
