import React from "react";
import { useDispatch } from "react-redux";
import { loadTicketById } from "../../../app/flux/slices/ticketSlice";
import StatusIndicator from "../statusIndicator";
import UserLink from "../userLink";
import { CollapsedTicket, Severity } from "../../../app/flux/slices/tableSlice";
import {
  TicketWrapper,
  TicketHeader,
  TicketBody,
  TicketBodyCell,
  statLen,
  statLeftMarg,
  statRightMarg,
} from "./styles";

// This component is meant to display only the essential details
// of a ticket (specifically, information that can be useful
// for delegation); see Ticket.tsx for a detailed view.

export default ({ ticket }: { ticket: CollapsedTicket }) => {
  const dispatch = useDispatch();
  return (
    <TicketWrapper>
      <TicketHeader>
        <StatusIndicator
          status={ticket.status}
          styles={{
            length: statLen,
            rightMargin: statRightMarg,
            leftMargin: statLeftMarg,
          }}
        />
        <h1 onClick={() => dispatch(loadTicketById(ticket.id))}>
          {ticket.title}
        </h1>
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
          <h3>{"Latest Update: " + ticket.updateDate}</h3>
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
            userInfo={ticket.author}
          />
        </TicketBodyCell>
      </TicketBody>
    </TicketWrapper>
  );
};
