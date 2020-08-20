import styled from "styled-components";
import { Link } from "react-router-dom";

export const SideNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props: { collapsed: boolean; sideNavWidth: number }) =>
    props.sideNavWidth}px;
  height: 100vh;
  margin-top: var(--nav-height);
  background-color: var(--vert-nav-bg);
  z-index: 7;
  border-right: 1px solid var(--dark);

  .selected,
  .selected i {
    color: var(--highlight);

    @media (min-width: 600px) {
      :hover {
        color: var(--text-color);
      }
    }
  }

  .inline-icon {
    width: 25px;
    margin-right: 0.8rem;
  }

  ul li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0.8rem 0;
    ${(props: { collapsed: boolean; sideNavWidth: number }) =>
      props.collapsed
        ? "padding-left: 0.3rem; font-size: 1.5rem;"
        : "padding-left: 0.8rem; font-size: 1.3rem;"}
  }

  @media (max-width: 1215px) {
    ${(props: { collapsed: boolean; sideNavWidth: number }) =>
      props.collapsed ? "width: 0; ul {display: none;}" : "width: 60vw;"}
    transition: width 0.1s;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);

    .profileWrapper {
      ${(props: { collapsed: boolean; sideNavWidth: number }) =>
        props.collapsed
          ? "display: none;"
          : "width: 172px; margin: 5rem auto 0;"}
    }

    ul {
      margin-top: 1rem;
      ${(props: { collapsed: boolean; sideNavWidth: number }) =>
        props.collapsed ? "display: none;padding-top: 10vh;" : "display: flex;"}
      flex-direction: column;

      li {
        margin: 0.1rem;
      }
    }
  }

  @media (max-width: 600px) {
    ${(props: { collapsed: boolean; sideNavWidth: number }) =>
      props.collapsed
        ? `
        border-right: none;
          display: block;
          width: 100vw;
          margin-top: auto;
          bottom: 0;
          left: 0;
          height: var(--mobile-nav-height);

          ul {
            padding-top: 0;
            height: 100%;
            width: fit-content;
            display: inline-flex;
            flex-direction: row;
            justify-content: center;

            a {
              margin: 0 0.5rem;
            }

            li:hover {
              background-color: rgba(0, 0, 0, 0);
            }
          }

          .mobileNavigationWidget {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;

            .mobileProfileWrapper {
              width: 53px;
              margin-right: 9px;
            }
            
            .badge {
              padding: 0 0.1rem 0 0.4rem;
            }

            .icon {
              color: var(--text-color);
            }
          }
        `
        : "width: 100vw;"}
  }
`;

// GlassDiv just serves to blur the background behind the
// sideNav because for screens of width between ~600-1200,
// the sidenav is only ~60vw
// Note: also has an onclick to toggle collapse
export const GlassPane = styled.div`
  @media (max-width: 1215px) and (min-width: 601px) {
    ${(props: { collapsed: boolean }) =>
      props.collapsed ? "display: none;" : ""}
    position: fixed;
    top: 0;
    right: 0;
    width: calc(40vw);
    height: calc(100vh - var(--nav-height));
    margin: var(--nav-height) 0 0 0;
    z-index: 6;
    backdrop-filter: blur(4px);
  }
`;

export const NavLink = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
  color: var(--text-color);
`;
