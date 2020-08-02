import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;

  @media (max-width: 1320px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    padding-top: 1rem;
    width: 90%;
    grid-template-columns: 1fr;
  }
`;

export const PieChartContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  padding: 2rem 0;
  grid-template-columns: repeat(2, calc(50% - 1rem));
  grid-gap: 2rem;

  @media (max-width: 1050px) {
    grid-template-columns: 100%;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const LineChartContainer = styled.div`
  width: 100%;
  @media (max-width: 600px) {
    width: 90%;
  }
  margin-bottom: 1rem;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - var(--nav-height) - 2rem - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
