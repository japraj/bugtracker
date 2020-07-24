import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/flux/auth/authSlice";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  collapsed: boolean;
  toggleCollapsed: () => void;
  className: string;
}

// This component displays the user's profile
export default (props: Props) => {
  const user = useSelector(selectUser);
  const length = props.collapsed ? "30px" : "80px";
  return user.authenticated ? (
    <Profile collapsed={props.collapsed} className={props.className}>
      <Avatar
        src={user.info.profileImg}
        style={{
          width: length,
          height: length,
        }}
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
            <Badge
              className="badge"
              badgeContent={user.notifications.length}
              overlap="circle"
              max={9}
              color="error"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Icon className="icon">notifications</Icon>
            </Badge>
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
