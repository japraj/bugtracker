import React from "react";
import {
  DarkWidgetWrapper,
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget";
import { Alert } from "rsuite";
import TextFieldButton from "../../components/input/textfieldButton";
import styled from "styled-components";

export default () => {
  return (
    <DarkWidgetWrapper>
      <Container>
        <DarkWidgetHeader>Forgot Password</DarkWidgetHeader>
        <Content>
          <TextFieldButton
            label="Email"
            labelWidth={40}
            defaultValue=""
            clearInputOnSubmit={true}
            editable={true}
            buttonIconName="send"
            onSubmit={(value: string | undefined) => {
              if (value) {
                // make a post request to the backend
                Alert.success(
                  "You will recieve a url to reset your password soon. This url will expire after 30 minutes. If you do not recieve an e-mail within 5 minutes, please check your junk folder before trying again.",
                  30000
                );
              }
            }}
            className=""
          />
        </Content>
      </Container>
    </DarkWidgetWrapper>
  );
};

const Container = styled(DarkWidget)`
  width: 600px;

  @media (max-width: 700px) {
    width: 90vw;
  }
`;

const Content = styled(DarkWidgetSection)`
  @media (max-width: 700px) {
    margin-top: 0.5rem;
  }
`;
