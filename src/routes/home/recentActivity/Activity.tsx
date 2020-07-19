import React from "react";
import styled from "styled-components";

export interface Activity {
  avatarUrl: string;
  username: string;
  description: string;
}

export default ({ activity }: { activity: Activity }) => {
  return (
    <Cell>
      <CellImg src={activity.avatarUrl} alt="Profile Picture" />
      <CellText>
        <strong>{activity.username}</strong>
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

const CellImg = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0;
  border: 1px solid var(--light);
`;

const CellText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.5rem;

  strong {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
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
