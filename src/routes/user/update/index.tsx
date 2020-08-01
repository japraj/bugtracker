import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStaged,
  setStaged,
  selectUserInfo,
} from "../../../app/flux/slices/userSlice";
import { selectUser } from "../../../app/flux/slices/authSlice";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../../components/container/widget";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import TextfieldButton from "../../../components/input/textfieldButton";
import { Alert } from "rsuite";
import styled from "styled-components";

export default () => {
  const isAuthor: boolean =
    useSelector(selectUser).info.tag === useSelector(selectUserInfo).tag;
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
            if (isAuthor) {
              // make a post request to the backend updating the user's profile image
              // use local state
              Alert.success("Successfully updated avatar.", 2000);
            } else {
              Alert.error(
                "You do not have sufficient permissions to perform this operation.",
                2000
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
