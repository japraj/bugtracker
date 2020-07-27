import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../../../../app/flux/slices/tableSlice";
import {
  setPageIndex,
  setNodesPerPage,
  selectPageIndex,
  selectTotalPages,
} from "../../../../app/flux/slices/tableSlice";
import { theme } from "../../../../app/constants";
import TextField from "../../../input/textfield";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  TablePaginationContainer,
  CustomPagination,
  MobileWrapper,
  MobileFloater,
} from "./styles";

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
