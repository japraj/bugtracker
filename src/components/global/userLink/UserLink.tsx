import React from "react";
import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import LinkButton from "../../input/linkButton/LinkButton";
import { UserInfo } from "../../../app/flux/auth/authSlice";

// Notes:
//  - imgLength is in pixels; it denotes both width & height because img must be a square for border radius to make it a circle
//  - for all string attributes in the below interface, units must be specified

interface Props {
  styleConfig: {
    className: string;
    showImg: boolean;
    imgLength: number;
    internalSpacing: string;
    showTag: boolean;
    tagColor: string;
    tagSize: string;
  };
  userInfo: UserInfo;
}

enum UserRank {
  "User",
  "Developer",
  "Manager",
  "Admin",
}

enum UserRankColors {
  "green",
  "blue",
  "darkred",
  "black",
}

export default (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  return (
    <ProfileWrapper
      className={props.styleConfig.className}
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
        setAnchorEl(anchorEl === null ? event.currentTarget : null)
      }
      onMouseLeave={() => setAnchorEl(null)}
    >
      {props.styleConfig.showImg ? (
        <Avatar
          src={props.userInfo.profileImg}
          style={{
            width: props.styleConfig.imgLength,
            height: props.styleConfig.imgLength,
          }}
        />
      ) : (
        <React.Fragment />
      )}
      <ProfileTag
        showTag={props.styleConfig.showTag}
        marginLeft={props.styleConfig.internalSpacing}
        fontSize={props.styleConfig.tagSize}
        color={props.styleConfig.tagColor}
      >
        {props.userInfo.tag}
      </ProfileTag>
      <Popper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <PopperContent>
              <Avatar
                src={props.userInfo.profileImg}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
              <PopperTag>{props.userInfo.tag}</PopperTag>
              <Chip
                style={{
                  color: "white",
                  backgroundColor: `var(--theme-${
                    UserRankColors[props.userInfo.rank]
                  })`,
                }}
                variant="outlined"
                size="small"
                label={UserRank[props.userInfo.rank]}
              />
              <LinkButton to={`/user/${props.userInfo.tag}`}>
                View Profile
              </LinkButton>
            </PopperContent>
          </Fade>
        )}
      </Popper>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  width: auto;

  :hover {
    cursor: pointer;
  }
`;

interface TagProps {
  showTag: boolean;
  fontSize: string;
  color: string;
  marginLeft: string;
}

const ProfileTag = styled.h3`
  display: ${(props: TagProps) => (props.showTag ? "block" : "none")};
  font-size: ${(props: TagProps) => props.fontSize};
  color: ${(props: TagProps) => props.color};
  margin: 0 0 0 ${(props: TagProps) => props.marginLeft};
  white-space: nowrap;
`;

const PopperContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  backdrop-filter: blur(8px);

  a {
    margin-top: 0.8rem;
  }
`;

const PopperTag = styled.h1`
  margin: 0.8rem 0;
  color: var(--text-color);
  white-space: nowrap;
`;
