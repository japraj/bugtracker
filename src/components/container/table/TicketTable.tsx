import React from "react";
import { WidgetWrapper, WidgetHeader } from "../widget/Widget";
import Search from "../../input/search/Search";
import Select, { SelectOption } from "../../input/select/Select";
import Button from "../../input/button/Button";
import styled from "styled-components";

type Props = {
  className: string;
  iconClassName: string;
  tableTitle: string;
  buttonCallback: () => void;
  nodeSet: React.ReactNode[];
};

enum Sort {
  NEW = "NEW",
  OLD = "OLD",
  SEVERITY = "SEVERITY",
  STATUS = "STATUS",
}

const sortSelectOptions: SelectOption[] = [
  { value: Sort.NEW, label: "Sort by Newest" },
  { value: Sort.OLD, label: "Sort by Oldest" },
  { value: Sort.SEVERITY, label: "Sort by Severity" },
  { value: Sort.STATUS, label: "Sort by Status" },
];

export default (props: Props) => (
  <WidgetWrapper className={props.className}>
    <TableHeader>
      <i className={props.iconClassName} aria-hidden="true" />
      <h1>{props.tableTitle}</h1>
      <Search
        label="Search"
        onChange={() => {}}
        onSubmit={() => {
          console.log("submitted");
        }}
      />
      <Select
        width={150}
        onChange={(newValue: string) => console.log(newValue)}
        options={sortSelectOptions}
      />
      <Button
        baseClassName=""
        buttonClassName="hoverfx"
        onClick={props.buttonCallback}
      >
        Reload
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
