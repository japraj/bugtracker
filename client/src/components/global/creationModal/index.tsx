import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNewTicket,
  selectDisplayed,
  selectNewTicket,
  wipeLocalChanges,
} from "../../../app/flux/slices/creationSlice";
import FormModal from "../formModal";

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
      displayAuthor={true}
      defaultTitle={ticket.title}
      defaultDesc={ticket.description}
      defaultLinks={ticket.imageLinks}
      injectedNode={<React.Fragment />}
    />
  );
};