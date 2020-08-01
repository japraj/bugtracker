import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 95vw;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;

  h1 {
    margin-left: 0.5rem;
  }

  .recentActivity,
  .ticketSet {
    width: 550px;
    align-self: flex-start;
    height: 100%;
    justify-content: flex-start;
  }

  .activityNode {
    height: 88.62px;
  }

  @media (max-width: 1800px) and (min-width: 950px) {
    grid-template-columns: 1fr 1fr;

    .recentActivity,
    .ticketSet {
      width: auto;
      align-self: flex-start;
      height: 100%;
      justify-content: flex-start;
    }
  }

  @media (max-width: 950px) {
    grid-template-columns: 1fr;

    .recentActivity,
    .ticketSet {
      margin: 0 auto;
      width: 95%;
    }
  }
`;

export const WidgetColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: auto;
  align-self: flex-start;

  .update {
    width: 100%;
  }

  .rank {
    margin-left: auto;
  }

  @media (max-width: 950px) {
    .update {
      width: 95%;
    }
  }
`;

export const WidgetRow = styled.div`
  max-width: 95vw;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  padding-bottom: 2rem;
  grid-gap: 2rem;
  flex-direction: row;
  align-items: center;

  @media (max-width: 950px) {
    width: 95%;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
