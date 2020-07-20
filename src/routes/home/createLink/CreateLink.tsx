import React from "react";
import { WidgetWrapper } from "../../../components/container/widget/Widget";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

export default () => {
  return (
    <LinkWrapper to={"/create"}>
      <LinkWidget>
        <Label>Create a new Ticket</Label>
        <Icon>create</Icon>
      </LinkWidget>
    </LinkWrapper>
  );
};

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const LinkWidget = styled(WidgetWrapper)`
  margin-top: 1.5rem;
  display: flex;
  padding: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: var(--highlight);
    cursor: pointer;
  }
`;

const Label = styled.h1`
  margin-right: auto;
`;
