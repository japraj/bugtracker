import React from "react";
import styled from "styled-components";

export type CollapsedTicket = {
  author: string;
  creationDate: string;
  id: number;
  title: string;
  severity: number;
  status: number;
};

enum Status {
  "new",
  "work-in-progress",
  "resolved",
}

enum StatusColors {
  "pink",
  "yellow",
  "green",
}

enum Severity {
  "trivial",
  "minor",
  "major",
  "crash",
}

const TicketWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    margin: 0 0.5rem;
  }
`;

export default (props: { ticket: CollapsedTicket }) => {
  return (
    <TicketWrapper>
      <h3>{props.ticket.id}</h3>
      <h3>{Severity[props.ticket.severity]}</h3>
      <h3 style={{ color: `var(--${StatusColors[props.ticket.status]})` }}>
        {Status[props.ticket.status]}
      </h3>
      <h3>{props.ticket.title}</h3>
      <h3>{props.ticket.creationDate}</h3>
    </TicketWrapper>
  );
};
