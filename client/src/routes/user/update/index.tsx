import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStaged,
  setStaged,
  selectUserInfo,
} from "../../../flux/slices/userSlice";
import { selectUser } from "../../../flux/slices/authSlice";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import TextfieldButton from "../../../components/input/textfieldButton";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserInfo, Rank } from "../../../constants/user";
import API from "../../../api";

export default () => {
  // local client
  const client: UserInfo = useSelector(selectUser).info;
  // user whose profile we are viewing
  const user: UserInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const stagedUrl = useSelector(selectStaged);

  return (
    <Container className="update">
      <WidgetHeader>
        <Icon className="inline-icon">publish</Icon>
        <h1>Upload Avatar Image</h1>
      </WidgetHeader>
      <Update>
        <Avatar
          src={stagedUrl}
          style={{
            width: "60px",
            height: "60px",
          }}
        />
        <TextfieldButton
          label="Paste an avatar url here"
          labelWidth={172}
          defaultValue=""
          clearInputOnSubmit={true}
          editable={true}
          buttonIconName="update"
          onSubmit={() => {
            // if client == user (i.e. the client is viewing their own profile) or
            // if client is an administrator, this operation is allowed
            if (client.tag === user.tag || client.rank === Rank.Admin)
              dispatch(API.updateUserAvatar());
            else
              toast.error(
                "You do not have sufficient permissions to perform this operation."
              );
          }}
          className="textfieldButton"
          onChange={(newValue: string) => dispatch(setStaged(newValue))}
          inputValue={stagedUrl}
        />
      </Update>
    </Container>
  );
};

const Container = styled(WidgetWrapper)`
  width: 95%;
`;

const Update = styled(WidgetSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .textfieldButton {
    margin-top: 1rem;
    margin-left: 1rem;
    width: calc(100% - 60px - 1rem);
  }
`;
