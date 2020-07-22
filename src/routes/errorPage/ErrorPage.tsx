import React from "react";
import {
  DarkWidgetWrapper,
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget/DarkWidget";
import HyperLink from "../../components/global/hyperLink/HyperLink";
import styled from "styled-components";

interface Props {
  width: string;
  header: string;
  bodyText: string;
  linkText: string;
  linkHref: string;
}

export default (props: Props) => {
  return (
    <DarkWidgetWrapper>
      <ErrorPage width={props.width}>
        <DarkWidgetHeader>{props.header}</DarkWidgetHeader>
        <DarkWidgetSection>
          <h1 style={{ fontSize: "inherit", display: "inline" }}>
            {props.bodyText}
          </h1>
          <HyperLink to={props.linkHref}>{props.linkText}</HyperLink>
        </DarkWidgetSection>
      </ErrorPage>
    </DarkWidgetWrapper>
  );
};

const ErrorPage = styled(DarkWidget)`
  width: ${(props: { width: string }) => props.width};

  h1 {
    line-height: 140%;
  }
  @media (max-width: 600px) {
  }
`;
