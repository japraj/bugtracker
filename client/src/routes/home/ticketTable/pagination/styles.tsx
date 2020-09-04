import styled from "styled-components";
import { WidgetSection } from "../../../../components/container/widget";
import Pagination from "@material-ui/lab/Pagination";

export const TablePaginationContainer = styled(WidgetSection)`
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

export const CustomPagination = styled(Pagination)`
  margin: 0 auto;
  width: fit-content;

  .MuiPaginationItem-outlined {
    :hover {
      background-color: var(--highlight) !important;
    }
  }
`;

export const MobileWrapper = styled.div`
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

export const MobileFloater = styled.div`
  margin-left: auto;
`;
