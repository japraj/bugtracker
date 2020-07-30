import React from "react";
import { UserInfo } from "../../../app/constants";
import UserLink from "../userLink";
import { UserLinkGrid, SetWrapper, UserLinkWrapper, Clickable } from "./styles";

interface Props {
  users: UserInfo[];
  className: string;
  imgLength: string;
  label: string;
  iconName: string;
  iconBackgroundColor: string;
  onClick: (userTag: string) => () => void;
}

export default (props: Props) => {
  return (
    <UserLinkGrid className={props.className}>
      <h1>{props.label}</h1>
      <SetWrapper>
        {props.users.map((user) => (
          <UserLinkWrapper key={user.tag}>
            <UserLink
              userInfo={user}
              styleConfig={{
                className: "stacked",
                showImg: true,
                imgLength: props.imgLength,
                internalSpacing: "0",
                showTag: false,
                tagSize: "0",
              }}
            />
            <Clickable
              style={{ backgroundColor: props.iconBackgroundColor }}
              onClick={props.onClick(user.tag)}
            >
              {props.iconName}
            </Clickable>
          </UserLinkWrapper>
        ))}
        <div style={{ height: props.imgLength }} />
      </SetWrapper>
    </UserLinkGrid>
  );
};
