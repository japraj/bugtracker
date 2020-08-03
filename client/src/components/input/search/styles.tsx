import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

export const SearchWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding: 0.1rem 0 0 1.2rem;
  border-radius: 30px;
  margin: auto 1rem 0 0;

  .searchButton {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px !important;
    // width: 32px !important;
    padding: 0.3rem 0.5rem 0.3rem 0.2rem !important;
    border-radius: 0 !important;
    border-top-right-radius: 30px !important;
    border-bottom-right-radius: 30px !important;

    :hover {
      border-radius: 0 !important;
      border-top-right-radius: 30px !important;
      border-bottom-right-radius: 30px !important;
    }
  }
`;

export const SearchIcon = styled(Icon)`
  font-size: 1.8rem;
`;
