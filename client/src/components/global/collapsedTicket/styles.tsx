import { WidgetSection } from "../../container/widget";
import styled from "styled-components";

export const statLen = "25px";
export const statRightMarg = "0.5rem";
export const statLeftMarg = "0.5rem";

export const TicketWrapper = styled(WidgetSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
`;

export const TicketHeader = styled.div`
  padding-top: 0.3rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.4rem;

  h1 {
    display: flex;
    width: calc(92% - ${statLen});
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;

    :hover {
      cursor: pointer;
    }
  }
`;

export const TicketBody = styled.div`
  width: 100%;
  display: grid;
  margin-left: 8%;
  grid-template-columns: 32% 60%;
  align-items: center;
  padding-bottom: 0.2rem;

  @media (max-width: 335px) {
    grid-template-columns: 40% 52%;
  }
`;

export const TicketBodyCell = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  height: 30px;

  h3 {
    font-size: 0.8rem;

    span {
      margin-left: 0.5rem;
    }
  }

  --tcell-border: 1px solid rgba(255, 255, 255, 0.15);

  :nth-child(odd) {
    border-right: var(--tcell-border);
  }

  :nth-child(even) {
    padding-left: 10px;
  }

  :nth-last-child(1),
  :nth-last-child(2) {
    border-top: var(--tcell-border);
    height: 33px;
  }
`;
