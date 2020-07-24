import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "./tableSlice";
import {
  setPageIndex,
  setNodesPerPage,
  selectPageIndex,
  selectTotalPages,
} from "./tableSlice";
import { WidgetSection } from "../../../components/container/widget/Widget";
import theme from "../../../components/input/InputTheme";
import TextField from "../../../components/input/textfield/TextField";
import { ThemeProvider } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import styled from "styled-components";

interface Props {
  nodesPerPage: number;
}

export default (props: Props) => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPageIndex);
  const perPage = (
    <TextField
      className="paginationTextField"
      inputWidth={window.innerWidth < 600 ? "30px" : "50px"}
      showLabel={true}
      labelText="Issues per page:"
      placeholder="num"
      setDefaultValue={true}
      defaultValue={initialState.nodesPerPage}
      type="number"
      onSubmit={(newValue: any) => dispatch(setNodesPerPage(Number(newValue)))}
    />
  );
  const paginator = (
    <CustomPagination
      size={window.innerWidth < 600 ? "small" : "medium"}
      siblingCount={1}
      count={totalPages}
      page={page}
      variant="outlined"
      shape="rounded"
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        dispatch(setPageIndex(value))
      }
    />
  );

  const goTo = (
    <TextField
      className="paginationTextField"
      inputWidth={window.innerWidth < 600 ? "30px" : "50px"}
      showLabel={true}
      labelText="Go to page:"
      placeholder="num"
      setDefaultValue={true}
      defaultValue={page}
      type="number"
      onSubmit={(newValue: any) => dispatch(setPageIndex(Number(newValue)))}
    />
  );

  const desktopLayout = (
    <React.Fragment>
      {perPage}
      {paginator}
      {goTo}
    </React.Fragment>
  );

  const mobileLayout = (
    <React.Fragment>
      {paginator}
      <MobileWrapper>
        {perPage}
        <MobileFloater>{goTo}</MobileFloater>
      </MobileWrapper>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <TablePaginationContainer>
        {window.innerWidth < 800 ? mobileLayout : desktopLayout}
      </TablePaginationContainer>
    </ThemeProvider>
  );
};

const TablePaginationContainer = styled(WidgetSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2rem;

  @media (min-width: 1100px) {
    padding: 0.5rem 1rem !important;

    .paginationTextField {
      div:before {
        width: 75%;
      }
    }
  }

  @media (max-width: 800px) {
    margin-top: 0.5rem;
    flex-direction: column;
  }
`;

const CustomPagination = styled(Pagination)`
  margin: 0 auto;
  width: fit-content;

  .MuiPaginationItem-outlined {
    :hover {
      background-color: var(--highlight) !important;
    }
  }
`;

const MobileWrapper = styled.div`
  margin-top: 0.8rem;
  width: 100%;
  padding: 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  * {
    font-size: 0.8rem !important;
  }
`;

const MobileFloater = styled.div`
  margin-left: auto;
`;
