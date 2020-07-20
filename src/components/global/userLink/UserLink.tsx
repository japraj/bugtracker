import React from "react";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
  userInfo: {
    profileImg: string;
    userTag: string;
    userRank: number;
  };
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export default (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ProfileWrapper
      className={props.styleConfig.className}
      to={`/user/${props.userInfo.userTag}`}
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
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
        {props.userInfo.userTag}
      </ProfileTag>
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Chip
          style={{
            color: "white",
            backgroundColor: `var(--theme-${
              UserRankColors[props.userInfo.userRank]
            })`,
          }}
          variant="outlined"
          size="small"
          label={UserRank[props.userInfo.userRank]}
        />
      </Popover>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-color);
  width: auto;
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
