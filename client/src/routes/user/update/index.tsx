import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStaged,
  setStaged,
  selectUserInfo,
  updateUser,
} from "../../../flux/slices/userSlice";
import { updateAvatar, selectUser } from "../../../flux/slices/authSlice";
import { updateStoredUser } from "../../../flux/slices/contextSlice";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget";
import Endpoints from "../../../constants/api";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import TextfieldButton from "../../../components/input/textfieldButton";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserInfo, Rank } from "../../../constants/user";

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
          onSubmit={(value: string | undefined) => {
            // if client == user (i.e. the client is viewing their own profile) or
            // if client is an administrator, this operation is allowed
            if (client.tag === user.tag || client.rank === Rank.Admin) {
              // make a post request to the backend updating the user's profile image
              // use local state
              fetch(`${Endpoints.UPDATE_USER}/${user.tag}`, {
                method: "PATCH",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([
                  {
                    op: "replace",
                    path: "/Avatar",
                    value: stagedUrl,
                  },
                ]),
              }).then((res) => {
                console.log(res);
                if (res.status === 204) {
                  var newUser = Object.assign({}, user, {
                    profileImg: stagedUrl,
                  });
                  toast.success("Successfully updated avatar.");
                  // update user profile page
                  dispatch(updateUser(newUser));
                  // update context slice
                  dispatch(updateStoredUser(newUser));
                  // if the client is changing their own avatar,
                  // update the sidebar avatar img too
                  if (client.tag === user.tag)
                    dispatch(updateAvatar(stagedUrl));
                } else toast.error("Something went wrong");
              });
            } else {
              toast.error(
                "You do not have sufficient permissions to perform this operation."
              );
            }
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
