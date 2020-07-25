import styled from "styled-components";

// Note: the left margin becomes 0 for
// screens below 1215px because the
// collapsed sidenav disappears at
// those screens (takes up too much
// space)
//
// Padding-bottom is present on mobile
// because of the special bottom nav
export default styled.main`
  padding: 2rem 40px 8px 40px;
  margin: var(--nav-height) 0 0
    ${(props: { sideNavWidth: number }) => props.sideNavWidth}px;
  height: 100%;

  @media (max-width: 1215px) and (min-width: 1101px) {
    margin-left: 0;
    padding: 1rem;
  }

  @media (max-width: 1100px) {
    margin-left: 0;
    padding: 1rem 0;
  }

  @media (max-width: 600px) {
    padding-bottom: calc(var(--mobile-nav-height) + 1rem);
  }
`;
