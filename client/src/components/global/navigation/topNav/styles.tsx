import styled from "styled-components";

export const TopNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  width: 100vw;
  height: var(--nav-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--nav-bg);
  z-index: 8;
  color: var(--text-color);
  border-bottom: 1px solid var(--dark);

  @media (min-width: 600px) {
    border-right: var(--scrollwidth) solid rgba(0, 0, 0, 0.8);
  }
`;

export const Label = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  margin: 0 auto;
  transform: translateX(-30px);

  .inline-icon {
    font-size: 1.25rem;
  }

  @media (max-width: 600px) {
    font-size: 1rem;

    .inline-icon {
      font-size: 1rem;
    }
  }
`;
// Note: label is translated 30px left to perfectly center it; the IconButton is 60px wide.
