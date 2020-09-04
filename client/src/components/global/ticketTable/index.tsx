import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HomeState,
  selectHomeSlice,
  setTotalPages,
  setPageIndex,
  setNodesPerPage,
  setSort,
} from "../../../flux/slices/homeSlice";
import { selectAllElements } from "../../../flux/slices/contextSlice";
import { selectUser } from "../../../flux/slices/authSlice";
import { WidgetWrapper, WidgetHeader } from "../../container/widget";
import TablePagination from "./pagination";
import TableTabs from "./tabs";
import TableTicket from "../collapsedTicket";
import Search from "../../input/search";
import Select from "../../input/select";
import {
  sortSelectOptions,
  generateTabSet,
  applySort,
} from "../../../constants/table";
import { CollapsedTicket, stringify } from "../../../constants/ticket";
import { Fallback } from "../../container/widget";
import styled from "styled-components";

export default (props: { className: string }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState("");
  const homeSlice: HomeState = useSelector(selectHomeSlice);
  const pageIndex = homeSlice.pageIndex;
  const nodesPerPage = homeSlice.nodesPerPage;
  const users = useSelector(selectAllElements("users"));
  const tabSet = generateTabSet(
    useSelector(selectUser),
    (tag: string) => users.filter((u) => u.tag === tag)[0].rank
  );

  const applyQuery = (set: CollapsedTicket[]): CollapsedTicket[] =>
    query === ""
      ? set
      : set.filter((ticket) =>
          stringify(ticket).toLowerCase().includes(query.toLowerCase())
        );

  const ticketSet: CollapsedTicket[] = applyQuery(
    applySort(
      homeSlice.sort,
      tabSet[homeSlice.tabIndex].filter(
        useSelector(selectAllElements("collapsedTickets"))
      )
    )
  );
  const totalPages = Math.ceil(ticketSet.length / nodesPerPage);
  if (totalPages !== homeSlice.totalPages) dispatch(setTotalPages(totalPages));

  return (
    <WidgetWrapper className={props.className}>
      <TableTabs
        tabSet={tabSet}
        onChange={() => {
          dispatch(setPageIndex(0));
          dispatch(setNodesPerPage(5));
          dispatch(setTotalPages(Math.ceil(ticketSet.length / 5)));
        }}
      />
      <TableControls>
        <Search
          label="Search"
          onChange={(newValue: string) => {
            setQuery(newValue);
          }}
        />
        <Select
          fixedWidth={true}
          width={150}
          mobileWidth={115}
          onChange={(newValue: string) => dispatch(setSort(newValue))}
          options={sortSelectOptions}
        />
      </TableControls>
      {ticketSet.length > 0 ? (
        ticketSet
          .filter(
            (ticket, index) =>
              index >= nodesPerPage * (pageIndex - 1) &&
              index < nodesPerPage * pageIndex
          )
          .map((ticket, index) => <TableTicket key={index} ticket={ticket} />)
      ) : (
        <Fallback>
          <h1>No tickets found</h1>
        </Fallback>
      )}
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
