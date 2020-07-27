import React from "react";
import { useSelector } from "react-redux";
import {
  selectNodesPerPage,
  selectTickets,
} from "../../../app/flux/slices/tableSlice";
import { WidgetWrapper, WidgetHeader } from "../../container/widget";
import TablePagination from "./pagination";
import TableTabs from "./tabs";
import TableTicket from "../collapsedTicket";
import Search from "../../input/search";
import Select from "../../input/select";
import { Tab, sortSelectOptions } from "../../../app/constants";
import styled from "styled-components";

const tabSet: Tab[] = [
  {
    iconName: "new_releases",
    title: "Latest",
    requiredRank: -1,
  },
  {
    iconName: "assignment_turned_in",
    title: "Resolved",
    requiredRank: -1,
  },
  {
    iconName: "cached",
    title: "Unassigned",
    requiredRank: 1,
  },
  {
    iconName: "confirmation_number",
    title: "My Issues",
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

type Props = {
  className: string;
};

export default (props: Props) => {
  const nodesPerPage = useSelector(selectNodesPerPage);
  const ticketSet = useSelector(selectTickets);
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
          mobileWidth={115}
          onChange={(newValue: string) => console.log(newValue)}
          options={sortSelectOptions}
        />
      </TableControls>
      {ticketSet
        .filter((ticket, index) => index < nodesPerPage)
        .map((ticket, index) => (
          <TableTicket key={index} ticket={ticket} />
        ))}
      <TablePagination nodesPerPage={nodesPerPage} />
    </WidgetWrapper>
  );
};

const TableControls = styled(WidgetHeader)`
  padding-top: 8px;

  .selectFormWrapper {
    margin: 0 1rem 0 auto;
  }
`;
