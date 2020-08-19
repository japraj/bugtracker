import React from "react";
import { Notification } from "../../../../constants/notification";
import NotificationNode from "../../notification";
import CommentBox from "../commentBox";
import styled from "styled-components";

export default ({
  activities,
  close,
}: {
  activities: Notification[];
  close: () => void;
}) => {
  return (
    <ActivityWrapper>
      {activities.map((activity) => (
        <NotificationNode
          key={activity.message + activity.ticketId + activity.date}
          onClick={close}
          commentVariant={true}
          // The highlight variant is only applied to actions, not comments.
          // Comments all have their ticketId set to null by default.
          className={`node ${
            activity.ticketId === "null" ? "normal" : "highlight"
          }`}
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

  .node {
    padding: 0.5rem;
    border-radius: 10px;

    h5:hover {
      cursor: text;
    }
  }

  .normal {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .highlight {
    background-color: var(--transparent-highlight);
  }
`;
