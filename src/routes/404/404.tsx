import React from "react";
import {
  DarkWidgetWrapper,
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget/DarkWidget";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default () => {
  return (
    <DarkWidgetWrapper>
      <DarkWidget style={{ width: "660px" }}>
        <DarkWidgetHeader>404 Error</DarkWidgetHeader>
        <DarkWidgetSection>
          Sorry, that page doesn't exist.{" "}
          <HyperLink to="/">Go to Home Page.</HyperLink>
        </DarkWidgetSection>
      </DarkWidget>
    </DarkWidgetWrapper>
  );
};

const HyperLink = styled(Link)`
  color: var(--highlight);
  text-decoration: none;
`;
