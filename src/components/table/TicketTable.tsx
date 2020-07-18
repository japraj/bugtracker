import React from "react";
import { WidgetWrapper, WidgetHeader, WidgetSection } from "../widget/Widget";
import Button from "../button/Button";
import styled from "styled-components";

type Props = {
  minWidth: string;
  iconClassName: string;
  tableTitle: string;
  buttonText: string;
  buttonCallback: () => void;
  nodeSet: React.ReactNode[];
};

export default (props: Props) => (
  <WidgetWrapper style={{ minWidth: `${props.minWidth}` }}>
    <TableHeader>
      <i className={props.iconClassName} aria-hidden="true" />
      <h1>{props.tableTitle}</h1>
      <Button className="hoverfx" onClick={props.buttonCallback}>
        {props.buttonText}
      </Button>
    </TableHeader>
    {props.nodeSet.map((node) => (
      <WidgetSection>{node}</WidgetSection>
    ))}
  </WidgetWrapper>
);

const TableHeader = styled(WidgetHeader)`
  button {
    margin-left: auto;
  }
`;
