import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Ticket,
  selectDisplayed,
  selectTicket,
  toggleDisplay,
  Reproducibility,
} from "../../../app/flux/slices/ticketSlice";
import { Severity } from "../../../app/flux/slices/tableSlice";
import StatusIndicator from "../statusIndicator";
import Modal from "@material-ui/core/Modal";
import UserLink from "../userLink";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {
  statusIndicatorLength,
  TicketWrapper,
  TicketHeader,
  TicketSection,
  FieldGrid,
  SectionContent,
  Description,
} from "./styles";

export default () => {
  const dispatch = useDispatch();
  const open: boolean = useSelector(selectDisplayed);
  const close = (): void => {
    dispatch(toggleDisplay());
  };
  const ticket: Ticket = useSelector(selectTicket);
  const mobileDisplay: boolean = window.innerWidth < 600;
  return (
    <Modal
      disableScrollLock={false}
      style={{ zIndex: 13 }}
      open={open}
      onClose={close}
      aria-labelledby="Issue Display"
      aria-describedby="An issue and its details."
    >
      <TicketWrapper width="95vw">
        <TicketHeader>
          <SectionContent>
            <StatusIndicator
              status={ticket.status}
              styles={{
                length: statusIndicatorLength,
                leftMargin: "0",
                rightMargin: "1rem",
              }}
            />
            <h1>{`#${ticket.id}: ${ticket.title}`}</h1>
          </SectionContent>
        </TicketHeader>
        <FieldGrid>
          <TicketField
            name="Creation Date"
            content={`${ticket.creationDate}`}
          />
          <TicketField name="Last Update" content={`${ticket.updateDate}`} />
          <TicketField
            name="Severity"
            content={
              <span className={Severity[ticket.severity]}>
                {Severity[ticket.severity]}
              </span>
            }
          />
          <TicketField
            name="Reproducibility"
            content={Reproducibility[ticket.reproducibility]}
          />
          <TicketField
            name="Author"
            content={
              <UserLink
                userInfo={ticket.author}
                styleConfig={{
                  className: "author",
                  showImg: true,
                  imgLength: mobileDisplay ? "25px" : "30px",
                  internalSpacing: "0.5rem",
                  showTag: true,
                  tagSize: "1.5rem",
                }}
              />
            }
          />
          <TicketField
            name="Assignees"
            content={
              <AvatarGroup
                style={{ marginLeft: "0.5rem" }}
                max={mobileDisplay ? 4 : 5}
              >
                {ticket.assignees.map((assignee) => (
                  <UserLink
                    key={assignee.tag}
                    userInfo={assignee}
                    styleConfig={{
                      className: "stacked",
                      showImg: true,
                      imgLength: mobileDisplay ? "25px" : "30px",
                      internalSpacing: "0",
                      showTag: false,
                      tagSize: "0",
                    }}
                  />
                ))}
              </AvatarGroup>
            }
          />
        </FieldGrid>
        <Description>
          <h2>Description:</h2>
          <p>{ticket.description}</p>
        </Description>
        {ticket.imageLinks.length > 0 ? <h1 /> : <React.Fragment />}
      </TicketWrapper>
    </Modal>
  );
};

const TicketField = ({
  name,
  content,
}: {
  name: string;
  content: string | React.ReactNode;
}) => (
  <SectionContent className="gridItem">
    <h2>{name}: </h2>
    <h3>{content}</h3>
  </SectionContent>
);
