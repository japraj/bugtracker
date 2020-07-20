import React from "react";
import {
  DarkWidgetWrapper,
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget/DarkWidget";
import { Link } from "react-router-dom";
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
      <DarkWidget style={{ width: props.width }}>
        <DarkWidgetHeader>{props.header}</DarkWidgetHeader>
        <DarkWidgetSection>
          {props.bodyText}
          <HyperLink to={props.linkHref}>{props.linkText}</HyperLink>
        </DarkWidgetSection>
      </DarkWidget>
    </DarkWidgetWrapper>
  );
};

const HyperLink = styled(Link)`
  color: var(--highlight);
  text-decoration: none;
`;
