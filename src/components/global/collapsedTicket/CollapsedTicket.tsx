import React from "react";
import { WidgetSection } from "../../container/widget/Widget";
import StatusIndicator from "./StatusIndicator";
import styled from "styled-components";
import UserLink from "../userLink/UserLink";
import { UserInfo } from "../../../app/flux/auth/authSlice";

export interface CollapsedTicket {
  userInfo: UserInfo;
  creationDate: string;
  title: string;
  severity: number;
  status: number;
  comments: number;
}

export enum Status {
  "unresolved",
  "work-in-progress",
  "resolved",
}

export enum Severity {
  "trivial",
  "minor",
  "major",
}

const statLen = "25px";
const statRightMarg = "0.5rem";
const statLeftMarg = "0.5rem";

// This component is meant to display only the essential details
// of a ticket (specifically, information that can be useful
// for delegation); see Ticket.tsx for a detailed view.

export default ({ ticket }: { ticket: CollapsedTicket }) => {
  return (
    <TicketWrapper>
      <TicketHeader>
        <StatusIndicator
          className={Status[ticket.status]}
          styles={{
            length: statLen,
            rightMargin: statRightMarg,
            leftMargin: statLeftMarg,
          }}
        />
        <h1>{ticket.title}</h1>
      </TicketHeader>
      <TicketBody>
        <TicketBodyCell>
          <h3 className="severity">
            Severity:
            <span className={Severity[ticket.severity]}>
              {Severity[ticket.severity]}
            </span>
          </h3>
        </TicketBodyCell>
        <TicketBodyCell>
          <h3>{"Latest Update: " + ticket.creationDate}</h3>
        </TicketBodyCell>
        <TicketBodyCell>
          <h3>{"Comments: " + ticket.comments}</h3>
        </TicketBodyCell>
        <TicketBodyCell>
          <UserLink
            styleConfig={{
              className: "author",
              showImg: true,
              imgLength: "20px",
              internalSpacing: "0.5rem",
              showTag: true,
              tagColor: "var(--text-color)",
              tagSize: "1.25rem",
            }}
            userInfo={ticket.userInfo}
          />
        </TicketBodyCell>
      </TicketBody>
    </TicketWrapper>
  );
};

const TicketWrapper = styled(WidgetSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
`;

const TicketHeader = styled.div`
  padding-top: 0.3rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.4rem;

  h1 {
    width: calc(92% - ${statLen});
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
  }
`;

const TicketBody = styled.div`
  width: 100%;
  display: grid;
  margin-left: 8%;
  grid-template-columns: 32% 60%;
  align-items: center;
  padding-bottom: 0.2rem;

  @media (max-width: 335px) {
    grid-template-columns: 40% 52%;
  }
`;

const TicketBodyCell = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  height: 30px;

  h3 {
    font-size: 0.8rem;

    span {
      margin-left: 0.5rem;
    }
  }

  --tcell-border: 1px solid rgba(255, 255, 255, 0.15);

  :nth-child(odd) {
    border-right: var(--tcell-border);
  }

  :nth-child(even) {
    padding-left: 10px;
  }

  :nth-last-child(1),
  :nth-last-child(2) {
    border-top: var(--tcell-border);
    height: 33px;
  }
`;
