import React from "react";
import { WidgetWrapper, WidgetHeader } from "../widget/Widget";
import TableTabs, { Tab } from "./TableTabs";
import Search from "../../input/search/Search";
import Select, { SelectOption } from "../../input/select/Select";
import Button from "../../input/button/Button";
import styled from "styled-components";

type Props = {
  className: string;
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

const tabSet: Tab[] = [
  {
    iconName: "new_releases",
    title: "New",
    requiredRank: 0,
  },
  {
    iconName: "assignment_turned_in",
    title: "Resolved",
    requiredRank: 0,
  },
  {
    iconName: "confirmation_number",
    title: "My Tickets",
    requiredRank: 0,
  },
  {
    iconName: "assignment",
    title: "Assigned",
    requiredRank: 1,
  },
  {
    iconName: "work",
    title: "Delegated",
    requiredRank: 2,
  },
];

export default (props: Props) => (
  <WidgetWrapper className={props.className}>
    <TableTabs tabSet={tabSet} />
    <TableControls>
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
    </TableControls>
    {props.nodeSet.map((node) => (
      <React.Fragment>{node}</React.Fragment>
    ))}
  </WidgetWrapper>
);

const TableControls = styled(WidgetHeader)`
  // padding-top: 0.2rem;

  h1 {
    margin-right: auto;
  }

  .selectFormWrapper {
    margin: 0 1rem 0 auto;
  }
`;
