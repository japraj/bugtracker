import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNewTicket,
  selectDisplayed,
  selectNewTicket,
  wipeLocalChanges,
} from "../../../flux/slices/creationSlice";
import FormModal from "../../../components/global/formModal";
import API from "../../../api";

export default () => {
  const dispatch = useDispatch();
  const open: boolean = useSelector(selectDisplayed);
  const ticket = useSelector(selectNewTicket);
  // while close actually toggles the display instead of setting it to false,
  // it can only be called when display = true so it is effectively the same
  // as setting display to false.
  const close = () => dispatch(wipeLocalChanges());

  const submit = (): void => {
    dispatch(API.createTicket(ticket));
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
      selectValues={[0, 0, 0, 0]}
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
