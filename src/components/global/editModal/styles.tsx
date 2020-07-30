import { ModalContentWrapper } from "../../container/modalContent";
import Button from "../../input/button";
import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: ${(props: { show: boolean }) => (props.show ? "flex" : "none")};
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 90px;
  position: sticky;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export const EditIcon = styled(Button)`
  pointer-events: all;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(8px) !important;
  padding: 0.8rem !important;
  border-radius: 50% !important;
  margin-bottom: 5px !important;
  transition: transform 0.25s ease-out;

  span {
    font-size: 3rem !important;

    @media (max-width: 600px) {
      font-size: 2rem !important;
    }
    color: var(--text-color);
  }

  :hover {
    cursor: pointer;
    background-color: var(--highlight) !important;
    transform: scale(1.1);
  }
`;

export const EditView = styled(ModalContentWrapper)`
  padding: 1rem;
  height: auto !important;
  max-height: calc(100vh - 3vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .userLinkGrid {
    ${(props: { rank: number }) => (props.rank > 0 ? "" : "display: none;")}
    padding: 0 0 1rem;
  }

  .userLinkGrid:first-child {
    margin-bottom: 1rem;
    margin-top: auto;
  }

  .editControls {
    padding: 1rem 2rem;
  }
`;

export const AssignmentContainer = styled.div`
  ${(props: { display: boolean }) => (props.display ? "" : "display: none;")}
  margin: 1rem 0;
  width: calc(100% - 4rem);
  padding: 18.5px 14px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.23);
`;
