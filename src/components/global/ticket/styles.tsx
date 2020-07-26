import styled from "styled-components";
import { ModalContentWrapper } from "../../container/modalContent";

export const statusIndicatorLength = "40px";

export const TicketWrapper = styled(ModalContentWrapper)`
  padding: 1rem;

  h2 {
    margin-right: 0.3rem;
  }

  @media (min-width: 1001px) {
    h2,
    h3 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 1000px) {
    h2,
    h3 {
      font-size: 0.9rem;
    }
  }
`;

export const TicketSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
  border-bottom: var(--ticket-border);
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const TicketHeader = styled(TicketSection)`
  h1 {
    color: var(--text-color);
    font-size: 1rem;
    width: calc(100% - 1rem - ${statusIndicatorLength});

    @media (min-width: 1001px) {
      font-size: 1.3rem;
    }
  }

  @media (min-width: 421px) {
    border-bottom: none;
  }

  @media (max-width: 420px) {
    margin-bottom: 0;
  }
`;

export const FieldGrid = styled.div`
  display: grid;

  .stacked {
    margin-left: -0.3rem;
  }

  .author {
    margin-left: 0.3rem;
  }

  .gridItem {
    padding: 0.5rem;
    min-height: 45px;
  }

  .MuiAvatarGroup-avatar {
    border-color: rgba(0, 0, 0, 0.5);
    background-color: var(--transparent-highlight);
    color: var(--text-color);
  }

  @media (min-width: 1001px) {
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: var(--ticket-border);

    .gridItem:nth-child(3n - 1),
    .gridItem:nth-child(3n) {
      border-left: var(--ticket-border);
      padding-left: 1rem;
    }

    .gridItem {
      border-top: var(--ticket-border);
    }

    .gridItem:nth-child(-n + 3) {
      border-top: none;
    }

    .author {
      * {
        font-size: 1.25rem;
      }
    }
  }

  @media (max-width: 1000px) and (min-width: 421px) {
    border-bottom: var(--ticket-border);
    grid-template-columns: 1fr 1fr;

    .gridItem:nth-child(2n) {
      border-left: var(--ticket-border);
      padding-left: 1rem;
    }

    .gridItem {
      border-top: var(--ticket-border);
    }

    .gridItem:nth-child(-n + 2) {
      border-top: none;
    }
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;

    .gridItem {
      padding: 1rem;
      height: 55px;
      border-bottom: var(--ticket-border);
    }

    .MuiAvatarGroup-avatar {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }
  }
`;

export const Description = styled(TicketSection)`
  margin-top: 0.8rem;
  flex-direction: column;

  p {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-color);
    text-align: center;

    @media (min-width: 1001px) {
      font-size: 1rem;
      padding-right: 3rem;
    }
  }

  h2 {
    margin-right: auto;
  }
`;
