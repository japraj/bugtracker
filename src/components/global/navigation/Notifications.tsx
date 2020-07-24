import React from "react";
import { Notification } from "../../../app/flux/auth/authSlice";
import UserLink from "../userLink/UserLink";
import styled from "styled-components";

export default ({ notifications }: { notifications: Notification[] }) => {
  return (
    <NotificationWrapper width={window.innerWidth < 600 ? "90vw" : "500px"}>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationElement className={notification.new ? "new" : ""}>
            <UserLink
              userInfo={notification.author}
              styleConfig={{
                className: "author",
                showImg: true,
                imgLength: 40,
                internalSpacing: "0.5rem",
                showTag: true,
                tagColor: "var(--text-color)",
                tagSize: "1.25rem",
              }}
            />
            <p>{notification.message}</p>
          </NotificationElement>
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
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  jutsify-content: center;

  .new {
    background-color: var(--transparent-highlight);
  }

  .author {
    z-index: 13;
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

const NotificationElement = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);

  p {
    margin-top: 1rem;
    max-width: calc(100% - 1.5rem);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: lowercase;
  }
`;
