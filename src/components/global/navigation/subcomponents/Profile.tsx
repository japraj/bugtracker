import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../app/flux/auth/authSlice";
import { viewNotifications } from "../../../../app/flux/auth/authSlice";
import UserLink from "../../userLink/UserLink";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";
import Modal from "@material-ui/core/Modal";

interface Props {
  collapsed: boolean;
  toggleCollapsed: () => void;
  className: string;
  showNotificationsOnly: boolean;
}

// Displays the user's profileImg/tag, a link to the settings page,
// and a button to access notifications
export default (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const notificationsAmount = user.notifications.filter(
    (notification) => notification.new
  ).length;

  const clearNewNotifications = () => {
    // if there were new notifications,
    // send a request to server setting all new notifications to viewed
    // and locally set all notifications to viewed too
    if (notificationsAmount > 0) {
      dispatch(viewNotifications());
      // Send a request to the server here.
    }
  };

  const close = () => {
    setOpen(false);
    clearNewNotifications();
  };

  const length = props.collapsed ? "30px" : "80px";

  const notificationsWidget = (
    <React.Fragment>
      <Badge
        className="badge"
        // BadgeContent is the number of new notifications
        // if it is 0, then the badge is not visible
        badgeContent={notificationsAmount}
        overlap="circle"
        max={9}
        color="error"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClick={() => setOpen(true)}
      >
        <Icon className="icon" onClick={() => setOpen(true)}>
          notifications
        </Icon>
      </Badge>
      <Modal
        style={{ zIndex: 12 }}
        open={open}
        onClose={close}
        aria-labelledby="Notifications"
        aria-describedby="A list of notifications for the user, each containing an author and a message."
      >
        <Notifications onRedirect={close} notifications={user.notifications} />
      </Modal>
    </React.Fragment>
  );

  // Mobile
  if (props.showNotificationsOnly) {
    return notificationsWidget;
  }

  return user.authenticated ? (
    <Profile collapsed={props.collapsed} className={props.className}>
      <UserLink
        styleConfig={{
          className: "",
          showImg: true,
          imgLength: length,
          internalSpacing: "0",
          showTag: false,
          tagSize: "0",
        }}
        userInfo={user.info}
      />

      {props.collapsed ? (
        <React.Fragment />
      ) : (
        <React.Fragment>
          <h1>{user.info.tag}</h1>
          <ProfileWidgetWrapper>
            <Link
              to="/settings"
              onClick={
                window.innerWidth < 600 ? props.toggleCollapsed : () => {}
              }
            >
              <Icon className="settings icon">settings</Icon>
            </Link>
            {notificationsWidget}
          </ProfileWidgetWrapper>
        </React.Fragment>
      )}
    </Profile>
  ) : (
    <React.Fragment />
  );
};

const Profile = styled.div`
  ${(props: { collapsed: boolean }) =>
    props.collapsed
      ? `margin: 1rem 1rem 0.5rem;`
      : `  
        margin: 1.5rem 1rem 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      `}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);

  h1 {
    margin-top: 0.5rem;
    width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.4rem;
  }
`;

const ProfileWidgetWrapper = styled.div`
  margin: 1rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  a {
    text-decorations: none;
  }

  .badge:hover {
    cursor: pointer;
  }

  .icon {
    color: var(--text-color);

    :hover {
      cursor: pointer;
      color: var(--highlight);
    }
  }

  .settings {
    margin-right: 1rem;
  }
`;
