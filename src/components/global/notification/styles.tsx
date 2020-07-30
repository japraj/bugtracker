import styled from "styled-components";

export const Cell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
  ${(props: { commentVariant: boolean }) =>
    props.commentVariant
      ? `
          height: auto;
          align-items: flex-start;
          
        `
      : ``}
`;

export const CellText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.5rem 0 0.7rem;
  width: calc(100% - 40px - 1rem);

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
    text-align: left;
    ${(props: { commentVariant: boolean }) => {
      if (!props.commentVariant)
        return `white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;`;
      return ``;
    }}

    @media (max-width: 1100px) {
      font-size: 0.8rem;
    }
  }

  h5:hover {
    cursor: pointer;
  }

  h6 {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.8rem;
    color: var(--text-grey);
  }
`;
