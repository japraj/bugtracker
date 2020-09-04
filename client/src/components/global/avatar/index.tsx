import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { UserInfo } from "../../../constants/user";

// Generate a hash based on tag
const getHashCode = (input: string): number => {
  var hash: number = 0;
  if (input.length === 0) return hash;
  for (var i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return hash;
};

// convert the hash into a color string
const intToHSL = (input: number): string =>
  "hsl(" + (input % 360) + ",100%,30%)";

export default (props: {
  imgLength: string;
  small?: boolean;
  large?: boolean;
  user: UserInfo;
}) => {
  var style = {
    width: props.imgLength,
    height: props.imgLength,
  };
  if (props.small)
    style = Object.assign(style, {
      fontSize: "0.7rem",
    });
  if (props.large)
    style = Object.assign(style, {
      fontSize: "2rem",
    });

  // if the user has a profile Image, use that; else, generate a color based on their tag
  return props.user.profileImg ? (
    <Avatar style={style} src={props.user.profileImg} />
  ) : (
    <Avatar
      style={Object.assign(style, {
        backgroundColor: intToHSL(getHashCode(props.user.tag)),
      })}
      children={props.user.tag.charAt(0)}
    />
  );
};
