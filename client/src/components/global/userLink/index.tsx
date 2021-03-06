import React from "react";
import Routes from "../../../constants/routes";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import LinkButton from "../../input/linkButton";
import { UserInfo } from "../../../constants/user";
import { RankObject, getRankObj } from "../../../constants/user";
import { selectElementByKey } from "../../../flux/slices/contextSlice";
import { useSelector } from "react-redux";
// Use a css file because of Material UI's portal functionality.
// in short, Material UI places the Popper and all its children
// in a separate div (meaning it is no longer a child of profile
// wrapper); in order to circumvent this, a css file is required.
// I think if there is a way to select a child's parent using css
// then a css file could be avoided. I found the ':has' selector
// but currently, it is not supported by any browser (July, 2020)
import Avatar from "../avatar";
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
  small?: boolean;
}

interface Props {
  styleConfig: StyleConfig;
  userTag: string;
  onRedirect?: () => void;
}

export default (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  var user: UserInfo = useSelector(selectElementByKey("users"))(props.userTag);
  if (!user) return <h1>{"undefined: " + props.userTag}</h1>;
  const rank: RankObject = getRankObj(user.rank);

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
          imgLength={props.styleConfig.imgLength}
          small={props.styleConfig.small}
          user={user}
        />
      ) : (
        <React.Fragment />
      )}
      <ProfileTag
        showTag={props.styleConfig.showTag}
        marginLeft={props.styleConfig.internalSpacing}
        fontSize={props.styleConfig.tagSize}
        color={`var(--theme-${rank.nameColor})`}
      >
        {user.tag}
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
              <Avatar imgLength="70px" user={user} />
              <PopperTag>{user.tag}</PopperTag>
              <Chip
                style={{
                  color: "white",
                  backgroundColor: `var(--theme-${rank.badgeColor})`,
                }}
                variant="outlined"
                size="small"
                label={rank.name}
              />
              <LinkButton
                to={`${Routes.USER}/${user.tag}`}
                onClick={() =>
                  props.onRedirect !== undefined ? props.onRedirect() : {}
                }
              >
                View Profile
              </LinkButton>
            </PopperContent>
          </Fade>
        )}
      </Popper>
    </ProfileWrapper>
  );
};
