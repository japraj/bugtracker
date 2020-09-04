import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNewTicket,
  selectDisplayed,
  selectNewTicket,
  wipeLocalChanges,
} from "../../../flux/slices/creationSlice";
import { selectUser, loadUser } from "../../../flux/slices/authSlice";
import { User } from "../../../constants/user";
import {
  CollapsedTicket,
  getCollapsedTicketFromDTO,
} from "../../../constants/ticket";
import { addCollapsedTickets } from "../../../flux/slices/contextSlice";
import Endpoints from "../../../constants/api";
import FormModal from "../../../components/global/formModal";
import { toast } from "react-toastify";

export default () => {
  const dispatch = useDispatch();
  const open: boolean = useSelector(selectDisplayed);
  const user: User = useSelector(selectUser);
  const ticket = useSelector(selectNewTicket);
  // while close actually toggles the display instead of setting it to false,
  // it can only be called when display = true so it is effectively the same
  // as setting display to false.
  const close = () => dispatch(wipeLocalChanges());

  const submit = (): void => {
    fetch(Endpoints.CREATE_TICKET, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then((res) => {
        const newTicket: CollapsedTicket = getCollapsedTicketFromDTO(res);
        dispatch(addCollapsedTickets([newTicket]));
      })
      .catch(() =>
        toast.error("Oops! Something went wrong, please try again.")
      );

    // make a post request here creating a ticket
    // send session key along with it (to provide author
    // and to allow for authorization)
    close();
  };

  return (
    <FormModal
      ariaLabel="Creation View"
      ariaDesc="A menu through which issues can be created."
      open={open}
      close={close}
      update={(change: object): void => {
        dispatch(updateNewTicket(change));
      }}
      submit={submit}
      submitButtonText="Submit"
      displaySelects={true}
      displayDevSelects={true}
      disableStatus={true}
      displayAuthor={true}
      defaultTitle={ticket.title}
      defaultDesc={ticket.description}
      defaultLinks={ticket.imageLinks}
      injectedNode={<React.Fragment />}
    />
  );
};
