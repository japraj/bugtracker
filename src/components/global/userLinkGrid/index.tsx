import React from "react";
import { UserInfo } from "../../../app/flux/slices/authSlice";
import UserLink from "../userLink";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

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
      </SetWrapper>
    </UserLinkGrid>
  );
};

const UserLinkGrid = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    user-select: none;
    text-align: left;
    width: 110%;
    padding-bottom: 0.5rem;
    border-bottom: var(--ticket-border);
    color: var(--text-color);
    margin-bottom: 1rem;
  }
`;

const SetWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, 30px);
  grid-gap: 1.5rem;
`;

const UserLinkWrapper = styled.div`
  position: relative;
`;

const Clickable = styled(Icon)`
  position: absolute;
  bottom: 0;
  right: -5px;
  color: var(--text-color);
  border-radius: 50%;
  font-size: 1rem !important;
  transition: transform 0.15s ease-out;

  :hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
