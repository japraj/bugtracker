import React from "react";
import { Notification } from "../../../../app/constants";
import NotificationNode from "../../notification";
import CommentBox from "../commentBox";
import styled from "styled-components";

export default ({ activities }: { activities: Notification[] }) => {
  return (
    <ActivityWrapper>
      {activities.map((activity) => (
        <NotificationNode
          onClick={() => {}}
          commentVariant={true}
          // The highlight variant is only applied to actions, not comments.
          // Comments all have their ticketId set to null by default.
          className={activity.ticketId === "null" ? "" : "highlight"}
          notification={activity}
        />
      ))}
      <CommentBox />
    </ActivityWrapper>
  );
};

const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;

  > div {
    margin-top: 1rem;

    @media (min-width: 1001px) {
      width: 900px;
    }

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  .highlight {
    background-color: var(--transparent-highlight);
    padding: 0.5rem;
    border-radius: 10px;
  }
`;
