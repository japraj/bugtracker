import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Status,
  Severity,
  Reproducibility,
  TypeLabel,
} from "../../../app/constants";
import {
  updateState,
  selectDisplayed,
  selectNewTicket,
  wipeLocalChanges,
} from "../../../app/flux/slices/creationSlice";
import Modal from "@material-ui/core/Modal";
import TicketForm from "../ticketForm";
import EditControls from "../../input/editControls";
import ContentWrapper from "../../container/ticketFormWrapper";

const keyToIndex = (givenKey: string, givenEnum: any): number => {
  for (let i = 0; i < Object.keys(givenEnum).length; i++)
    if (givenEnum[i] === givenKey) return i;
  return -1;
};

export default () => {
  const dispatch = useDispatch();
  const open: boolean = useSelector(selectDisplayed);
  const ticket = useSelector(selectNewTicket);

  // while close actually toggles the display instead of setting it to false,
  // it can only be called when display = true so it is effectively the same
  // as setting display to false.
  const close = () => dispatch(wipeLocalChanges());

  const submit = (): void => {
    // make a post request here creating a ticket
    // send session key along with it (to provide author
    // and to allow for authorization)
    close();
  };

  const update = (change: object): void => {
    dispatch(updateState(change));
  };

  return (
    <Modal
      disableScrollLock={false}
      style={{ zIndex: 13 }}
      open={open}
      onClose={close}
      aria-labelledby="Creation View"
      aria-describedby="A menu through which issues can be created."
    >
      <ContentWrapper width={window.innerWidth < 800 ? "95vw" : "700px"}>
        <TicketForm
          displaySelects={true}
          displayAuthor={true}
          onStatusChange={(newValue: string) =>
            update({ status: keyToIndex(newValue, Status) })
          }
          onSeverityChange={(newValue: string) =>
            update({ severity: keyToIndex(newValue, Severity) })
          }
          onReproducibilityChange={(newValue: string) =>
            update({ reproducibility: keyToIndex(newValue, Reproducibility) })
          }
          onTagChange={(newValue: string) =>
            update({ typeLabel: keyToIndex(newValue, TypeLabel) })
          }
          defaultTitle={ticket.title}
          onTitleChange={(newValue: string) => update({ title: newValue })}
          defaultDesc={ticket.description}
          onDescChange={(newValue: string) => update({ description: newValue })}
          defaultLinks={ticket.imageLinks}
          onLinksChange={(newLinks: string[]) =>
            update({ imageLinks: newLinks })
          }
        />
        <EditControls
          showCancel={true}
          cancelCallback={close}
          submitCallback={submit}
          submitText="Submit"
          className="editControls"
        />
      </ContentWrapper>
    </Modal>
  );
};
