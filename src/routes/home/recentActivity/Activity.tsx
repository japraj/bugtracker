import React from "react";
import UserLink from "../../../components/global/userLink/UserLink";
import { Notification } from "../../../app/flux/auth/authSlice";
import styled from "styled-components";

export default ({ activity }: { activity: Notification }) => {
  return (
    <Cell>
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
        userInfo={activity.author}
      />
      <CellText>
        <strong>{activity.author.tag}</strong>
        <h2>{activity.message}</h2>
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

  strong {
    font-size: 1rem;
    margin-bottom: 0.5rem;

    @media (max-width: 1100px) {
      font-size: 0.9rem;
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
