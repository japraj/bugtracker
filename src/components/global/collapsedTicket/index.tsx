import React from "react";
import {
  TicketWrapper,
  TicketHeader,
  TicketBody,
  TicketBodyCell,
  statLen,
  statLeftMarg,
  statRightMarg,
} from "./styles";
import StatusIndicator from "../statusIndicator";
import UserLink from "../userLink";
import { UserInfo } from "../../../app/flux/slices/authSlice";

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
              tagSize: "1.25rem",
            }}
            userInfo={ticket.userInfo}
          />
        </TicketBodyCell>
      </TicketBody>
    </TicketWrapper>
  );
};
