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
  "red",
  "blue",
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
    text-transform: capitalize;
    font-size: 1.5rem;
    margin-right: 0.2rem;
  }

  h2,
  h3 {
    margin: 0 0.5rem;
  }

  h2 {
    color: var(--text-grey);
  }
`;

const TicketSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default (props: { ticket: CollapsedTicket }) => {
  return (
    <TicketWrapper>
      <TicketSection style={{ marginBottom: "0.5rem" }}>
        <h1>{props.ticket.title}</h1>
      </TicketSection>
      <TicketSection>
        <h2>{"by " + props.ticket.author}</h2>
        <h3>{"id: " + props.ticket.id}</h3>
        <h3>{"severity: " + Severity[props.ticket.severity]}</h3>
        <h3>
          {"status: "}
          <span
            style={{
              color: `var(--theme-${StatusColors[props.ticket.status]})`,
            }}
          >
            {Status[props.ticket.status]}
          </span>
        </h3>
        <h3>{"date: " + props.ticket.creationDate}</h3>
      </TicketSection>
    </TicketWrapper>
  );
};
