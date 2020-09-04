import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../flux/slices/authSlice";
import { viewNotifications } from "../../../flux/slices/authSlice";
import Routes from "../../../constants/routes";
import { Notification, Variant } from "../../../constants/notification";
import { getRankObj } from "../../../constants/user";
import Avatar from "../avatar";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import NotificationSet from "./notificationSet";
import Modal from "@material-ui/core/Modal";
import { Profile, ProfileWidgetWrapper } from "./styles";

interface Props {
  collapsed: boolean;
  toggleCollapsed: () => void;
  className: string;
  showNotificationsOnly: boolean;
}

// Displays the user's profileImg/tag, a link to the settings page,
// and a button to access notifications. Note: this component is not
// related to the user route! This has to do solely with
// authenticated users' avatar/name/notifications/etc that are found
// in the nav bar
export default (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const notificationsAmount = user.notifications.filter(
    (notification: Notification) => notification.new
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
        <div>
          <NotificationSet
            onClick={close}
            notifications={user.notifications}
            variant={Variant.GLOBAL}
          />
        </div>
      </Modal>
    </React.Fragment>
  );

  // Mobile
  if (props.showNotificationsOnly) {
    return notificationsWidget;
  }

  return user.authenticated ? (
    <Profile collapsed={props.collapsed} className={props.className}>
      <Avatar
        imgLength={length}
        user={user.info}
        small={props.collapsed}
        large={!props.collapsed}
      />
      {props.collapsed ? (
        <React.Fragment />
      ) : (
        <React.Fragment>
          <h1
            style={{
              color: `var(--theme-${getRankObj(user.info.rank).nameColor})`,
            }}
          >
            {user.info.tag}
          </h1>
          <ProfileWidgetWrapper>
            <Link
              to={`${Routes.USER}/${user.info.tag}`}
              onClick={
                window.innerWidth < 600 ? props.toggleCollapsed : () => {}
              }
            >
              <Icon className="settings icon">person</Icon>
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
