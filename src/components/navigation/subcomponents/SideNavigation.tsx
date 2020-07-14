import React from "react";
import { NavigationItem } from "../NavigationWrapper";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import { LogoutItem } from "../NavigationWrapper";

export default ({
  collapsed,
  collapsedWidth,
  extendedWidth,
  navItemSet,
  toggleCollapsed,
  logout,
}: {
  collapsed: boolean;
  collapsedWidth: number;
  extendedWidth: number;
  navItemSet: NavigationItem[];
  toggleCollapsed: () => void;
  logout: () => void;
}) => {
  const NavLinkSet = navItemSet.map((navItem) => (
    <NavLink
      to={"/" + navItem.path}
      onClick={
        navItem === LogoutItem
          ? () => {
              logout();
              toggleCollapsed();
            }
          : toggleCollapsed
      }
    >
      <ButtonBase
        focusRipple
        style={{
          width: collapsed ? collapsedWidth : extendedWidth,
          fontFamily: "Merriweather",
        }}
      >
        <li className="hoverfx2" key={navItem.text}>
          <i className={navItem.iconClassNames + " inline-icon"} />
          {collapsed ? "" : navItem.text}
        </li>
      </ButtonBase>
    </NavLink>
  ));
  return (
    <React.Fragment>
      <SideNav
        collapsed={collapsed}
        sideNavWidth={collapsed ? collapsedWidth : extendedWidth}
      >
        <ul>{NavLinkSet}</ul>
      </SideNav>
      <GlassDiv {...{ collapsed }} onClick={toggleCollapsed} />
    </React.Fragment>
  );
};

const SideNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props: { collapsed: boolean; sideNavWidth: number }) =>
    props.sideNavWidth}px;
  height: 100vh;
  margin-top: var(--nav-height);
  background-color: var(--vert-nav-bg);
  z-index: 7;

  ul li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0.6rem 0;
    ${(props: { collapsed: boolean; sideNavWidth: number }) =>
      props.collapsed
        ? "padding-left: 0.3rem; font-size: 1.5rem;"
        : "padding-left: 0.8rem; font-size: 1.3rem;"}
  }

  @media (max-width: 1100px) {
    ${(props: { collapsed: boolean; sideNavWidth: number }) =>
      props.collapsed ? "width: 0; ul {display: none;}" : "width: 60vw;"}
    transition: width 0.1s;

    ul {
      padding-top: 10vh;
      ${(props: { collapsed: boolean; sideNavWidth: number }) =>
        props.collapsed ? "display: none;" : "display: flex;"}
      flex-direction: column;
    }

    ul li {
      margin: 0.1rem;
    }
  }
`;

const GlassDiv = styled.div`
  @media (max-width: 1100px) {
    ${(props: { collapsed: boolean }) =>
      props.collapsed ? "display: none;" : ""}
    position: fixed;
    top: 0;
    right: 0;
    width: 40vw;
    height: calc(100vh - var(--nav-height));
    margin-top: var(--nav-height);
    z-index: 6;
    backdrop-filter: blur(4px);
  }
`;

const NavLink = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
  color: var(--text-color);
`;
