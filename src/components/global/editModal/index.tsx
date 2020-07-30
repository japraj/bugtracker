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
import { ModalContentWrapper } from "../../container/modalContent";
import UserLinkGrid from "../userLinkGrid";
import Button from "../../input/button";
import TicketForm from "../ticketForm";
import EditControls from "../../input/editControls";
import styled from "styled-components";

export default (props: {
  maxLinks: number;
  imgLength: string;
  modalImgLength: string;
  title: string;
  description: string;
}) => {
  const dispatch = useDispatch();
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
            statusCondition={rank > 0}
            onStatusChange={(newValue: string) => {}}
            severityCondition={rank > 0}
            onSeverityChange={(newValue: string) => {}}
            reproducibilityCondition={rank > 0}
            onReproducibilityChange={(newValue: string) => {}}
            tagCondition={rank > 0}
            onTagChange={(newValue: string) => {}}
            defaultTitle={props.title}
            onTitleChange={(newValue: string) => {}}
            defaultDesc={props.description}
            onDescChange={(newValue: string) => {}}
          />
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
          <EditControls
            showCancel={true}
            cancelCallback={close}
            submitCallback={() => {
              dispatch(pushLocalChanges());
              setOpen(false);
            }}
            submitText="Save"
          />
        </EditView>
      </Modal>
    </React.Fragment>
  );
};

const ButtonWrapper = styled.div`
  display: ${(props: { show: boolean }) => (props.show ? "flex" : "none")};
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: auto;
  position: sticky;
  right: 0;
  bottom: 0;
`;

const EditIcon = styled(Button)`
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(8px) !important;
  padding: 0.8rem !important;
  border-radius: 50% !important;
  transition: transform 0.25s ease-out;

  span {
    font-size: 3rem !important;

    @media (max-width: 600px) {
      font-size: 2rem !important;
    }
    color: var(--text-color);
  }

  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const EditView = styled(ModalContentWrapper)`
  padding: 1rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .userLinkGrid {
    ${(props: { rank: number }) => (props.rank > 0 ? "" : "display: none;")}
    padding: 1rem 2rem;
    margin-bottom: 1rem;
  }

  .userLinkGrid:first-child {
    margin-top: auto;
  }
`;
