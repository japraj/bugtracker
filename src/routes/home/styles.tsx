import styled from "styled-components";

export const HomeWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 20vw;
  width: 100%;
  height: auto;

  @media (min-width: 1101px) {
    .asideContainer,
    .recentActivity {
      width: 400px;
    }

    .recentActivity {
      margin-bottom: 1.5rem;
    }
  }

  .tableContainer {
    min-width: 1000px;
    width: 45vw;
    justify-self: center;
  }

  .asideContainer {
    margin-bottom: auto;
    justify-self: center;
  }

  @media (min-width: 1101px) and (max-width: 1670px) {
    padding: 0 1rem;
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;

    .tableContainer,
    .asideContainer {
      width: 98%;
    }

    .asideContainer {
      .recentActivity {
        margin-right: 1.5rem;
      }

      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
  }

  @media (max-width: 1100px) {
    padding: 0 1rem;
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;

    .tableContainer,
    .asideContainer {
      min-width: 0;
      width: 95vw;
      margin: 0 auto;
    }

    .recentActivity {
      margin-bottom: 1.5rem;
    }
  }
`;
