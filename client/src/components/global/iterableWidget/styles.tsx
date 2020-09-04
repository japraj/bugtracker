import { WidgetHeader, WidgetSection } from "../../container/widget";
import styled from "styled-components";

export const Header = styled(WidgetHeader)`
  ${(props: { addmediaquery: boolean }) =>
    props.addmediaquery
      ? `
        @media (max-width: 350px) {
          padding: 1.2rem 0 0;
          flex-direction: column;

         .MuiTablePagination-root {
            margin-left: 0;
         }
        }
      `
      : ``}
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const PaginationContainer = styled.div`
  margin-left: auto;
  width: auto;
  height: auto;
  border: none !important;

  * {
    min-height: 0 !important;
    max-height: 32px !important;
  }

  .MuiTablePagination-spacer + p,
  .MuiTablePagination-selectRoot {
    display: none;
  }

  .MuiTablePagination-actions {
    margin-left: 5px;
  }

  button {
    width: 35px;
    height: 35px;
    padding: 0;
  }
`;
