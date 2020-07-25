import styled from "styled-components";
import { ModalContentWrapper } from "../../../container/modalContent";

export const NotificationWrapper = styled(ModalContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  jutsify-content: center;

  .notification {
    padding-left: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
  }

  .new {
    background-color: var(--transparent-highlight);
  }
`;

export const EmptyNotificationsBanner = styled.h1`
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0 50vh;
  height: 3rem;
  width: 100%;
  font-style: italic;
`;
