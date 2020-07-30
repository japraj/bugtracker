import styled from "styled-components";

export const HomeWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: auto;

  .tableContainer {
    margin-right: 3vw;
    min-width: 1000px;
    width: 45vw;
  }

  @media (max-width: 1670px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .tableContainer {
      width: 100%;
      margin-right: 0;
    }
  }

  @media (max-width: 1100px) {
    .tableContainer {
      min-width: 0;
      width: 95vw;
      margin: 0 auto;
    }
  }
`;

export const Aside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 500px;

  .recentActivity {
    margin-bottom: 2rem;
  }

  @media (max-width: 1770px) {
    width: 400px;
  }

  @media (max-width: 1670px) {
    margin-top: 2rem;
    width: 100%;
    flex-direction: row;

    .recentActivity {
      width: 50%;
      margin: 0 2rem 0 0;
    }
  }

  @media (max-width: 1100px) {
    width: 95vw;
  }

  @media (max-width: 840px) {
    flex-direction: column;

    .recentActivity {
      width: 100%;
      margin: 0 0 2rem;
    }
  }
`;

export const MiscContainer = styled.div`
  width: 100%;
  grid-gap: 2rem;

  @media (max-width: 1670px) {
    width: calc(50% - 2rem);
  }

  @media (max-width: 840px) {
    width: 100%;
  }
`;
