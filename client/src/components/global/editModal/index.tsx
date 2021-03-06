import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditedTicket } from "../../../constants/ticket";
import { UserInfo, Rank } from "../../../constants/user";
import {
  updateEdit,
  wipeLocalChanges,
  toggleEditDisplay,
  TicketState,
  selectTicketSlice,
  selectAvailable,
} from "../../../flux/slices/ticketSlice";
import API from "../../../api";
import { selectUser } from "../../../flux/slices/authSlice";
import Icon from "@material-ui/core/Icon";
import UserLinkGrid from "./userLinkGrid";
import FormModal from "../formModal";
import ContainerLabel from "../containerLabel";
import DeletionModal from "./deletionModal";
import { ButtonWrapper, EditIcon, AssignmentContainer } from "./styles";

export default (props: {
  maxLinks: number;
  imgLength: string;
  modalImgLength: string;
  title: string;
  description: string;
  imageLinks: string[];
}) => {
  const dispatch = useDispatch();
  const user: UserInfo = useSelector(selectUser).info;
  const rank: number = user.rank;
  const ticketSlice: TicketState = useSelector(selectTicketSlice);
  const available: string[] = useSelector(selectAvailable);
  const editedTicket: EditedTicket = ticketSlice.editedTicket;
  const isAuthor: boolean = ticketSlice.currentTicket.author === user.tag;

  const update = (change: object): void => {
    dispatch(updateEdit(change));
  };

  const moveUser = (userTag: string) => () => {
    let newSet: string[] = Object.assign(
      [],
      //getTagsFromUsers(editedTicket.assignees)
      editedTicket.assignees
    );
    // If the user is currently available, then we
    // want to assign them. Else, we want to unassign
    //getTagsFromUsers(available).includes(userTag)
    available.includes(userTag)
      ? newSet.push(userTag)
      : newSet.splice(newSet.indexOf(userTag), 1);
    // update({ assignees: getUsersFromTags(ticketSlice.developers, newSet) });
    update({ assignees: newSet });
  };

  const toggle = (): void => {
    dispatch(toggleEditDisplay());
  };

  const close = (): void => {
    toggle();
    dispatch(wipeLocalChanges());
  };

  const submit = (): void => {
    dispatch(API.updateTicket(editedTicket));
    close();
  };

  return (
    <React.Fragment>
      <ButtonWrapper show={rank > Rank.User || isAuthor}>
        <EditIcon className="" onClick={toggle}>
          <Icon>create</Icon>
        </EditIcon>
      </ButtonWrapper>
      <FormModal
        ariaLabel="Edit View"
        ariaDesc="A menu through which an issue's values/characteristics can be updated."
        open={ticketSlice.displayEditModal}
        close={close}
        update={update}
        submit={submit}
        submitButtonText="Save"
        displaySelects={rank > Rank.User || isAuthor}
        displayDevSelects={rank > Rank.User}
        // Do not need to disable status because it will only show up for devs
        displayAuthor={isAuthor}
        defaultTitle={props.title}
        defaultDesc={props.description}
        defaultLinks={editedTicket.imageLinks}
        selectValues={[
          ticketSlice.currentTicket.status,
          ticketSlice.currentTicket.severity,
          ticketSlice.currentTicket.reproducibility,
          ticketSlice.currentTicket.typeLabel,
        ]}
        injectedNode={
          <AssignmentContainer display={rank > Rank.Developer}>
            <ContainerLabel label="Assignees" />
            <UserLinkGrid
              className="userLinkGrid"
              users={editedTicket.assignees}
              imgLength={props.modalImgLength}
              label="Assigned:"
              iconName="removeCircle"
              iconBackgroundColor="var(--red)"
              onClick={moveUser}
            />
            <UserLinkGrid
              className="userLinkGrid"
              users={available}
              imgLength={props.modalImgLength}
              label="Available:"
              iconName="addCircle"
              iconBackgroundColor="var(--black-bg-green)"
              onClick={moveUser}
            />
          </AssignmentContainer>
        }
        controlsInjectable={
          <DeletionModal display={isAuthor || rank > Rank.Developer} />
        }
      />
    </React.Fragment>
  );
};
