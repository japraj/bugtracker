import React from "react";
import UserLink from "../userLink/UserLink";
import { Notification } from "../../../app/flux/auth/authSlice";
import styled from "styled-components";

export default ({
  notification,
  className,
}: {
  notification: Notification;
  className: string;
}) => {
  return (
    <Cell className={className}>
      <UserLink
        styleConfig={{
          className: "",
          showImg: true,
          imgLength: window.innerWidth > 1100 ? 50 : 40,
          internalSpacing: "0",
          showTag: false,
          tagColor: "rgba(0, 0, 0, 0)",
          tagSize: "0",
        }}
        userInfo={notification.author}
      />
      <CellText>
        <UserLink
          styleConfig={{
            className: "author",
            showImg: false,
            imgLength: 0,
            internalSpacing: "0",
            showTag: true,
            tagColor: "var(--text-color)",
            tagSize: "1rem",
          }}
          userInfo={notification.author}
        />
        <h2>{notification.message}</h2>
      </CellText>
    </Cell>
  );
};

const Cell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
`;

const CellText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.5rem 0 0.7rem;
  width: calc(100% - 50px);

  .author {
    max-width: 90%;

    h3 {
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;

      @media (max-width: 1100px) {
        font-size: 0.9rem;
      }
    }
  }

  h2 {
    font-size: 0.9rem;
    max-width: 95%;
    color: var(--text-lightgrey);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;

    @media (max-width: 1100px) {
      font-size: 0.8rem;
    }
  }
`;
