import React from "react";
import {
  DarkWidgetWrapper,
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget/DarkWidget";
import HyperLink from "../../components/global/hyperLink/HyperLink";

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
