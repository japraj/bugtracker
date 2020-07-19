import React from "react";
import { WidgetSection } from "../../container/widget/Widget";
import styled from "styled-components";
import UserLink from "../userLink/UserLink";

export interface UserInfo {
  profileImg: string;
  userTag: string;
  userRank: number;
}

export interface CollapsedTicket {
  userInfo: UserInfo;
  creationDate: string;
  title: string;
  severity: number;
  status: number;
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

export default (props: { ticket: CollapsedTicket }) => {
  return (
    <TicketWrapper>
      <TicketStatus
        className={`fa fa-circle statusIndicator ${
          Status[props.ticket.status]
        }`}
        aria-hidden="true"
      />
      <TicketBody>
        <TicketTitle>
          <h1>{props.ticket.title}</h1>
        </TicketTitle>
        <TicketSection>
          <h3 className="severity">
            Severity:
            <span className={Severity[props.ticket.severity]}>
              {Severity[props.ticket.severity]}
            </span>
          </h3>
          <h3>{"Date: " + props.ticket.creationDate}</h3>
          <UserLink
            styleConfig={{
              className: "author",
              showImg: true,
              imgLength: 30,
              internalSpacing: "0.5rem",
              showTag: true,
              tagColor: "var(--text-color)",
              tagSize: "1.25rem",
            }}
            userInfo={props.ticket.userInfo}
          />
        </TicketSection>
      </TicketBody>
    </TicketWrapper>
  );
};

const TicketWrapper = styled(WidgetSection)`
  padding: 0.25rem 1rem 0.25rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const TicketStatus = styled.i`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
`;

const TicketBody = styled.div`
  width: calc(100% - 75px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TicketSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.5rem;

  h3 {
    font-size: 1rem;
  }

  .severity {
    text-align: left;
    width: 160px;

    span {
      margin-left: 0.3rem;
    }
  }

  .author {
    margin-left: auto;
    margin-right: 1rem;
  }
`;

const TicketTitle = styled(TicketSection)`
  margin: 1rem auto 0.8rem;

  h1 {
    text-transform: capitalize;
    font-size: 1.3rem;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
