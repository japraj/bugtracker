import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAssignees,
  selectStagedAssignees,
  selectAvailable,
  pushLocalChanges,
  wipePendingCommit,
  moveToNewSet,
} from "../../../app/flux/slices/ticketSlice";
import { selectUserRank } from "../../../app/flux/slices/authSlice";
import StackedUserLinks from "../stackedUserLinks";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import { ModalContentWrapper } from "../../container/modalContent";
import UserLinkGrid from "../userLinkGrid";
import EditControls from "../../input/editControls";
import styled from "styled-components";

export default (props: {
  maxLinks: number;
  imgLength: string;
  modalImgLength: string;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const rank = useSelector(selectUserRank);
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
      <PrimaryView>
        <StackedUserLinks {...props} users={assignees} />
        <AddIcon
          show={rank > 1}
          onClick={() => setOpen(!open)}
          displayMargin={assignees.length > 0}
        >
          add
        </AddIcon>
      </PrimaryView>
      <Modal
        disableScrollLock={false}
        style={{ zIndex: 13 }}
        open={open}
        onClose={close}
        aria-labelledby="Delegation View"
        aria-describedby="A menu through which the set of users assigned to an issue can be updated."
      >
        <DelegationView
          width={window.innerWidth < 600 ? "95vw" : "500px"}
          mobile={window.innerWidth < 600}
          height={window.innerWidth < 600 ? "" : "500px"}
        >
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
              if (stagedAssignees !== assignees) dispatch(pushLocalChanges());
              setOpen(false);
            }}
            submitText="Save"
          />
        </DelegationView>
      </Modal>
    </React.Fragment>
  );
};

const PrimaryView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AddIcon = styled(Icon)`
  display: ${(props: { show: boolean; displayMargin: boolean }) =>
    props.show ? "block" : "none"};
  margin-left: ${(props: { show: boolean; displayMargin: boolean }) =>
    props.displayMargin ? "0.5rem" : "0"};
  font-size: 1rem;
  color: var(--text-color);
  transition: transform 0.25s ease-out;

  :hover {
    color: var(--highlight);
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const DelegationView = styled(ModalContentWrapper)`
  ${(props: { mobile: boolean; height: string }) =>
    props.mobile
      ? ``
      : `
        top: calc(50vh - calc(${props.height} / 2));
        height: ${props.height};`}

  padding: 1rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .userLinkGrid {
    padding: 1rem 2rem;
    margin-bottom: 1rem;
  }

  .userLinkGrid:nth-child(2) {
    margin-bottom: auto;
  }
`;
