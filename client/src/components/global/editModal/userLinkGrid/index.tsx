import React from "react";
import UserLink from "../../userLink";
import { UserLinkGrid, SetWrapper, UserLinkWrapper, Clickable } from "./styles";

interface Props {
  users: string[];
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
        {props.users.map((userTag) => (
          <UserLinkWrapper key={userTag}>
            <UserLink
              userTag={userTag}
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
              onClick={props.onClick(userTag)}
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
