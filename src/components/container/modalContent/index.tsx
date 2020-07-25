import styled from "styled-components";

export const ModalContentWrapper = styled.div`
  position: absolute;
  height: calc(100vh - 3vh - var(--nav-height));
  top: calc(var(--nav-height) + 1.5vh);
  width: ${(props: { width: string }) => props.width};
  left: calc(50% - calc(${(props: { width: string }) => props.width} / 2));
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 4px;

  ::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 600px) {
    height: calc(100vh - 3vh - var(--nav-height) - var(--mobile-nav-height));
  }
`;
