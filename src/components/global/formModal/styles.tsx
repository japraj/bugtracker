import { ModalContentWrapper } from "../../container/modalContent";
import styled from "styled-components";

export const ContentWrapper = styled(ModalContentWrapper)`
  padding: 1rem;
  height: auto !important;
  max-height: calc(100vh - 3vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .editControls {
    padding: 1rem 2rem;
  }
`;

export const SelectWrapper = styled.div`
  height: 43px;
`;

export const SelectGrid = styled.div`
  ${(props: { display: boolean }) => (props.display ? "" : "display: none;")}
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  background-color: rgba(255, 255, 255, 0.1);
  padding: 18.5px 14px 2rem;
  margin: 2rem auto;
  display: grid;
  grid-gap: 2rem 3rem;
  width: calc(100% - 4rem);
  justify-content: center;
  grid-template-columns: repeat(2, calc(50% - 28px));

  @media (max-width: 650px) {
    grid-template-columns: calc(100% - 14px);
  }
`;

export const TextWrapper = styled.div`
  ${(props: { display: boolean }) => (props.display ? "" : "display: none;")}
  width: 100%;
  padding: 0 2rem;

  .textSection {
    background-color: rgba(255, 255, 255, 0.1);
    width: 100%;
    margin-bottom: 2rem;
  }
`;
