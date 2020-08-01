import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDisplayed,
  selectTicket,
  selectFailures,
  toggleDisplay,
} from "../../../app/flux/slices/ticketSlice";
import { Ticket, Severity, Reproducibility } from "../../../app/constants";
import TicketTag from "../ticketTag";
import StatusIndicator from "../statusIndicator";
import Modal from "@material-ui/core/Modal";
import UserLink from "../userLink";
import StackedUserLinks from "../stackedUserLinks";
import EditModal from "../editModal";
import ImageGrid from "./imageGrid";
import Communications from "./communications";
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
  const failures: number = useSelector(selectFailures);
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

            <h1>
              <TicketTag label={ticket.typeLabel} />
              {`#${ticket.id}: ${ticket.title}`}
            </h1>
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
                onRedirect={close}
              />
            }
          />
          <TicketField
            name="Assignees"
            content={
              <StackedUserLinks
                imgLength={mobileDisplay ? "25px" : "30px"}
                maxLinks={mobileDisplay ? 4 : 5}
                users={ticket.assignees}
                onClick={close}
              />
            }
          />
        </FieldGrid>
        <Description>
          <h2>Description:</h2>
          <p>{ticket.description}</p>
        </Description>
        {ticket.imageLinks.length === 0 ||
        failures === ticket.imageLinks.length ? (
          <React.Fragment />
        ) : (
          <TicketSection>
            <ImageGrid imageLinks={ticket.imageLinks} />
          </TicketSection>
        )}
        <Communications activities={ticket.activity} close={close} />
        <EditModal
          imgLength={mobileDisplay ? "25px" : "30px"}
          modalImgLength={"40px"}
          maxLinks={mobileDisplay ? 4 : 5}
          title={ticket.title}
          description={ticket.description}
          imageLinks={ticket.imageLinks}
        />
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
