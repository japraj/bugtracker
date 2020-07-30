import { ModalContentWrapper } from "../../container/modalContent";
import styled from "styled-components";

export default styled(ModalContentWrapper)`
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
