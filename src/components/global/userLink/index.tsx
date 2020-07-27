import React from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import LinkButton from "../../input/linkButton";
import { UserInfo } from "../../../app/constants";
// Use a css file because of Material UI's portal functionality.
// in short, Material UI places the Popper and all its children
// in a separate div (meaning it is no longer a child of profile
// wrapper); in order to circumvent this, a css file is required.
// I think if there is a way to select a child's parent using css
// then a css file could be avoided. I found the ':has' selector
// but currently, it is not supported by any browser (July, 2020)
import "./Popper.css";
import { ProfileWrapper, ProfileTag, PopperContent, PopperTag } from "./styles";

// Notes:
//  - imgLength denotes both width & height because img must be a square in order to make it a circle
//  - units must be specified for all string atributes below (other than className)

interface StyleConfig {
  className: string;
  showImg: boolean;
  imgLength: string;
  internalSpacing: string;
  showTag: boolean;
  tagSize: string;
}

interface Props {
  styleConfig: StyleConfig;
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

enum UserNameColors {
  "white",
  "brightblue",
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
        color={`var(--theme-${UserNameColors[props.userInfo.rank]})`}
      >
        {props.userInfo.tag}
      </ProfileTag>
      <Popper
        style={{ zIndex: 13 }}
        className="popper"
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={150}>
            <PopperContent>
              <Avatar
                src={props.userInfo.profileImg}
                style={{
                  width: "70px",
                  height: "70px",
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
