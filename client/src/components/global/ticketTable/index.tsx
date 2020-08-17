import React from "react";
import { useSelector } from "react-redux";
import { Rank } from "../../../constants/user";
import { selectNodesPerPage } from "../../../flux/slices/tableSlice";
import { selectAllElements } from "../../../flux/slices/contextSlice";
import { WidgetWrapper, WidgetHeader } from "../../container/widget";
import TablePagination from "./pagination";
import TableTabs from "./tabs";
import TableTicket from "../collapsedTicket";
import Search from "../../input/search";
import Select from "../../input/select";
import { Tab, sortSelectOptions } from "../../../constants/table";
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
    requiredRank: Rank.Developer,
  },
  {
    iconName: "confirmation_number",
    title: "My Issues",
    requiredRank: Rank.User,
  },
  {
    iconName: "assignment",
    title: "Assigned",
    requiredRank: Rank.Developer,
  },
  {
    iconName: "work",
    title: "Delegated",
    requiredRank: Rank.Manager,
  },
];

type Props = {
  className: string;
};

export default (props: Props) => {
  const nodesPerPage = useSelector(selectNodesPerPage);
  const ticketSet = useSelector(selectAllElements("collapsedTickets"));
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
          fixedWidth={true}
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
