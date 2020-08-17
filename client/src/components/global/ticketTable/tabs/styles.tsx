import styled from "styled-components";
import { Rank } from "../../../../constants/user";
import { WidgetHeader } from "../../../container/widget";

export const TabContainer = styled(WidgetHeader)`
  padding: 0 !important;
  border-bottom: 1px solid transparent;
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.15);

  .selected,
  .selected:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const TabSet = styled.ul`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;

  li:first-of-type {
    border-top-left-radius: 5px;
  }

  @media (max-width: 870px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const TableTab = styled.li`
  height: 48px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .inline-icon {
    margin-left: 0;
  }

  @media (max-width: 1100px) {
    h1,
    .inline-icon {
      font-size: 1rem;
    }
  }

  @media (max-width: 870px) {
    ${(props: { userRank: number }) =>
      props.userRank > Rank.User ? `border: 1px solid rgba(0, 0, 0, 0.1);` : ``}
    border-top: none;

    .selected {
      border: none;
    }
  }

  @media (max-width: 600px) {
    padding: 1rem 0.7rem;

    h1,
    .inline-icon {
      font-size: 0.8rem;
    }

    .inline-icon {
      margin-right: 0.3rem;
    }
  }

  @media (max-width: 300px) {
    h1,
    .inline-icon {
      font-size: 0.6rem;
    }
  }

  ${(props: { userRank: number }) =>
    props.userRank !== Rank.Developer
      ? `
        :nth-last-child(1),
        :nth-last-child(2),
        :nth-last-child(3) {
          border-bottom: none;
        }`
      : `
        :nth-last-child(1),
        :nth-last-child(2) {
          border-bottom: none;
        }`}
`;
