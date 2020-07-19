import React from "react";
import { WidgetWrapper, WidgetHeader, WidgetSection } from "../widget/Widget";
import Button from "../button/Button";
import Select, { SelectOption } from "../select/Select";
import styled from "styled-components";

type Props = {
  minWidth: string;
  iconClassName: string;
  tableTitle: string;
  buttonCallback: () => void;
  nodeSet: React.ReactNode[];
};

enum Sort {
  NEW = "NEW",
  OLD = "OLD",
  SEVERITY = "SEVERITY",
}

const sortSelectOptions: SelectOption[] = [
  { value: Sort.NEW, label: "Sort by Newest" },
  { value: Sort.OLD, label: "Sort by Oldest" },
  { value: Sort.SEVERITY, label: "Sort by Severity" },
];

export default (props: Props) => (
  <WidgetWrapper style={{ minWidth: `${props.minWidth}` }}>
    <TableHeader>
      <i className={props.iconClassName} aria-hidden="true" />
      <h1>{props.tableTitle}</h1>
      <Select
        width={150}
        onChange={(newValue: string) => console.log(newValue)}
        options={sortSelectOptions}
      />
      <Button className="hoverfx" onClick={props.buttonCallback}>
        View More
      </Button>
    </TableHeader>
    {props.nodeSet.map((node) => (
      <React.Fragment>{node}</React.Fragment>
    ))}
  </WidgetWrapper>
);

const TableHeader = styled(WidgetHeader)`
  padding-top: 1.2rem;

  h1 {
    margin-right: auto;
  }

  .selectFormWrapper {
    margin-right: 1rem;
  }
`;
