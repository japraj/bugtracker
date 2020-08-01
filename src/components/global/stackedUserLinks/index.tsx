import React from "react";
import { UserInfo } from "../../../app/constants";
import UserLink from "../userLink";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import styled from "styled-components";

export interface Props {
  users: UserInfo[];
  maxLinks: number;
  imgLength: string;
  onClick?: () => void;
}

export default (props: Props) => (
  <AssigneesWrapper>
    <Assignees max={props.maxLinks}>
      {props.users.map((user) => (
        <UserLink
          key={user.tag}
          userInfo={user}
          styleConfig={{
            className: "stacked",
            showImg: true,
            imgLength: props.imgLength,
            internalSpacing: "0",
            showTag: false,
            tagSize: "0",
          }}
          onRedirect={props.onClick}
        />
      ))}
    </Assignees>
  </AssigneesWrapper>
);

const Assignees = styled(AvatarGroup)`
  margin-left: 0.5rem;

  .stacked {
    margin-left: -0.3rem;
  }
`;

const AssigneesWrapper = styled.div`
  .MuiAvatarGroup-avatar {
    border-color: rgba(0, 0, 0, 0.5);
    background-color: var(--transparent-highlight);
    color: var(--text-color);
  }

  @media (max-width: 420px) {
    .MuiAvatarGroup-avatar {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }
  }
`;
