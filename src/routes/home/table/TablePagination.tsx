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
  return (
    <ThemeProvider theme={theme}>
      <TablePaginationContainer>
        <TextField
          className="paginationTextField"
          inputWidth="50px"
          showLabel={true}
          labelText="Tickets per page:"
          placeholder="num"
          setDefaultValue={true}
          defaultValue={initialState.nodesPerPage}
          type="number"
          onSubmit={(newValue: any) =>
            dispatch(setNodesPerPage(Number(newValue)))
          }
        />
        <CustomPagination
          count={totalPages}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            dispatch(setPageIndex(value))
          }
        />
        <TextField
          className="paginationTextField"
          inputWidth="50px"
          showLabel={true}
          labelText="Go to page:"
          placeholder="num"
          setDefaultValue={true}
          defaultValue={page}
          type="number"
          onSubmit={(newValue: any) => dispatch(setPageIndex(Number(newValue)))}
        />
      </TablePaginationContainer>
    </ThemeProvider>
  );
};

const TablePaginationContainer = styled(WidgetSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;

  .paginationTextField {
    div:before {
      width: 75%;
    }
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
