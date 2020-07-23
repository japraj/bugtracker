import React from "react";
import { WidgetWrapper } from "../../../components/container/widget/Widget";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

export default () => {
  return (
    <LinkWrapper to={"/create"}>
      <LinkWidget>
        <h1>Create a new Ticket</h1>
        <Icon className="icon">create</Icon>
      </LinkWidget>
    </LinkWrapper>
  );
};

const LinkWrapper = styled(Link)`
  text-decoration: none;
  min-width: 400px;
`;

const LinkWidget = styled(WidgetWrapper)`
  display: flex;
  padding: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: var(--highlight);
    cursor: pointer;
  }

  h1 {
    margin-right: auto;
  }

  @media (max-width: 1100px) {
    .icon {
      font-size: 1.2rem;
    }

    h1 {
      font-size: 0.9rem;
    }
  }
`;
