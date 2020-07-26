import styled from "styled-components";

export const Cell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
`;

export const CellText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.5rem 0 0.7rem;
  width: calc(100% - 50px);

  .author {
    max-width: 90%;

    h3 {
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;

      @media (max-width: 1100px) {
        font-size: 0.9rem;
      }
    }
  }

  h5 {
    font-size: 0.9rem;
    max-width: 95%;
    color: var(--text-lightgrey);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1100px) {
      font-size: 0.8rem;
    }
  }

  h5:hover {
    cursor: pointer;
  }
`;
