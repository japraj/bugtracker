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
      <TimeStamp>{activity.timestamp}</TimeStamp>
      <CellImg src={activity.avatarUrl} alt="Profile Picture" />
      <strong>{activity.username}</strong>
      <h2>{activity.description}</h2>
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
  height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0.5rem 0;

  strong {
    margin-right: 0.3rem;
  }

  h2 {
    color: var(--text-lightgrey);
  }
`;

const TimeStamp = styled.h3`
  color: var(--text-grey);
`;

const CellImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 1rem;
  border: 1px solid var(--light);
`;
