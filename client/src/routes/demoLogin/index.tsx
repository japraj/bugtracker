import React from "react";
import { useDispatch } from "react-redux";
import {
  DarkWidgetWrapper,
  DarkWidget,
} from "../../components/container/darkWidget";
import ButtonBase from "@material-ui/core/ButtonBase";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { startDemo } from "../../constants/demo";

export default () => {
  const dispatch = useDispatch();
  return (
    <DarkWidgetWrapper>
      <Container>
        <Button onClick={startDemo(dispatch)}>
          <Icon className="icon">perm_contact_calendar</Icon>
          <h1>Demo Login</h1>
        </Button>
      </Container>
    </DarkWidgetWrapper>
  );
};

const Container = styled(DarkWidget)`
  width: auto;
  padding: 0 !important;
`;

const Button = styled(ButtonBase)`
  border-radius: 5px !important;
  display: flex;
  flex-direction: column;
  padding: 3rem !important;

  .icon {
    color: var(--text-color);
    font-size: 7rem;
  }

  h1 {
    font-family: "Roboto";
    font-size: 1.5rem;
  }
`;
