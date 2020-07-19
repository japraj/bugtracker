import React from "react";
import UserLink from "../../../components/global/userLink/UserLink";
import { UserInfo } from "../../../components/global/collapsedTicket/CollapsedTicket";
import styled from "styled-components";

export interface Activity {
  userInfo: UserInfo;
  description: string;
}

export default ({ activity }: { activity: Activity }) => {
  return (
    <Cell>
      <UserLink
        styleConfig={{
          className: "",
          showImg: true,
          imgLength: 50,
          internalSpacing: "0",
          showTag: false,
          tagColor: "rgba(0, 0, 0, 0)",
          tagSize: "0",
        }}
        userInfo={activity.userInfo}
      />
      <CellText>
        <strong>{activity.userInfo.userTag}</strong>
        <h2>{activity.description}</h2>
      </CellText>
    </Cell>
  );
};

const Cell = styled.div`
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

  strong {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    max-width: 300px;
    font-size: 1rem;
    overflow: hidden;
    color: var(--text-lightgrey);
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: lowercase;
  }
`;
