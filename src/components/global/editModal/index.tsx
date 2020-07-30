import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTicket,
  selectAssignees,
  selectStagedAssignees,
  selectAvailable,
  pushLocalChanges,
  wipePendingCommit,
  moveToNewSet,
} from "../../../app/flux/slices/ticketSlice";
import { selectUser } from "../../../app/flux/slices/authSlice";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import UserLinkGrid from "../userLinkGrid";
import TicketForm from "../ticketForm";
import EditControls from "../../input/editControls";
import {
  ButtonWrapper,
  EditIcon,
  EditView,
  AssignmentContainer,
} from "./styles";

export default (props: {
  maxLinks: number;
  imgLength: string;
  modalImgLength: string;
  title: string;
  description: string;
  imageLinks: string[];
}) => {
  const dispatch = useDispatch();
  const [imageLinks, setImageLinks] = useState(props.imageLinks);
  const [open, setOpen] = useState(false);
  const rank = useSelector(selectUser).info.rank;
  const isAuthor =
    useSelector(selectTicket).author.tag === useSelector(selectUser).info.tag;
  const assignees = useSelector(selectAssignees);
  const stagedAssignees = useSelector(selectStagedAssignees);
  const available = useSelector(selectAvailable);

  const close = () => {
    dispatch(wipePendingCommit());
    setOpen(false);
  };

  const moveUser = (userTag: string) => () => {
    dispatch(moveToNewSet(userTag));
  };

  return (
    <React.Fragment>
      <ButtonWrapper show={rank > 0 || isAuthor}>
        <EditIcon className="" onClick={() => setOpen(true)}>
          <Icon>create</Icon>
        </EditIcon>
      </ButtonWrapper>
      <Modal
        disableScrollLock={false}
        style={{ zIndex: 13 }}
        open={open}
        onClose={close}
        aria-labelledby="Edit View"
        aria-describedby="A menu through which an issue's values/characteristics can be updated."
      >
        <EditView
          width={window.innerWidth < 800 ? "95vw" : "700px"}
          rank={rank}
        >
          <TicketForm
            displaySelects={rank > 0}
            onStatusChange={(newValue: string) => {}}
            onSeverityChange={(newValue: string) => {}}
            onReproducibilityChange={(newValue: string) => {}}
            onTagChange={(newValue: string) => {}}
            defaultTitle={props.title}
            onTitleChange={(newValue: string) => {}}
            defaultDesc={props.description}
            onDescChange={(newValue: string) => {}}
            defaultLinks={imageLinks}
            onLinksChange={setImageLinks}
          />
          <AssignmentContainer>
            <UserLinkGrid
              className="userLinkGrid"
              users={stagedAssignees}
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
          <EditControls
            showCancel={true}
            cancelCallback={close}
            submitCallback={() => {
              dispatch(pushLocalChanges());
              setOpen(false);
            }}
            submitText="Save"
            className="editControls"
          />
        </EditView>
      </Modal>
    </React.Fragment>
  );
};
