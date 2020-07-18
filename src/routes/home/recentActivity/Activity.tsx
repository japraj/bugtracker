import React from "react";
import styled from "styled-components";

export interface Activity {
  avatarUrl: string;
  username: string;
  description: string;
  timestamp: string;
}

export default ({ activity }: { activity: Activity }) => {
  return (
    <Cell>
      <CellImg src={activity.avatarUrl} alt="Profile Picture" />
      <strong>{activity.username}</strong>
      <h2>{activity.description}</h2>
      <TimeStamp>{activity.timestamp}</TimeStamp>
    </Cell>
  );
};

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 100%;
  height: 70px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0.5rem 0;

  strong {
    margin: 0 0.3rem 0 0.5rem;
  }

  h2 {
    color: var(--text-lightgrey);
    margin-right: 0.3rem;
  }
`;

const TimeStamp = styled.h3`
  color: var(--text-grey);
`;

const CellImg = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: 0;
  border: 1px solid var(--light);
`;
