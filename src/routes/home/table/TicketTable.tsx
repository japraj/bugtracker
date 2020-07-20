import React from "react";
import { useSelector } from "react-redux";
import { selectNodesPerPage } from "./tableSlice";
import {
  WidgetWrapper,
  WidgetHeader,
} from "../../../components/container/widget/Widget";
import TablePagination from "./TablePagination";
import TableTabs, { Tab } from "./TableTabs";
import Search from "../../../components/input/search/Search";
import Select, { SelectOption } from "../../../components/input/select/Select";
import Button from "../../../components/input/button/Button";
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

export default (props: Props) => {
  const nodesPerPage = useSelector(selectNodesPerPage);
  return (
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
      {props.nodeSet
        .filter((node, index) => index < nodesPerPage)
        .map((node, index) => (
          <React.Fragment key={index}>{node}</React.Fragment>
        ))}
      <TablePagination nodesPerPage={nodesPerPage} />
    </WidgetWrapper>
  );
};

const TableControls = styled(WidgetHeader)`
  padding-top: 8px;

  h1 {
    margin-right: auto;
  }

  .selectFormWrapper {
    margin: 0 1rem 0 auto;
  }
`;
