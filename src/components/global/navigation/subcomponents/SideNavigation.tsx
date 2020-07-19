import React from "react";
import { useLocation } from "react-router-dom";
import { NavigationItem } from "../NavigationWrapper";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import { LogoutItem } from "../NavigationWrapper";
import Icon from "@material-ui/core/Icon";

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
  const location = useLocation().pathname;
  const NavLinkSet = navItemSet.map((navItem) => (
    <NavLink
      to={"/" + navItem.path}
      onClick={navItem === LogoutItem ? logout : () => {}}
    >
      <ButtonBase
        focusRipple
        style={{
          width: collapsed ? collapsedWidth : extendedWidth,
          fontFamily: "Roboto",
        }}
      >
        <li
          className={`hoverfx3 ${
            navItem === LogoutItem
              ? ""
              : "/" + navItem.path === location
              ? "selected"
              : ""
          }`}
          key={navItem.text}
        >
          <Icon className="inline-icon">{navItem.iconName}</Icon>
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
  border-right: 1px solid var(--dark);

  .selected,
  .selected i {
    color: var(--highlight);
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

  @media (max-width: 1100px) {
    ${(props: { collapsed: boolean; sideNavWidth: number }) =>
      props.collapsed ? "width: 0; ul {display: none;}" : "width: 60vw;"}
    transition: width 0.1s;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);

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
    width: calc(40vw - var(--scrollwidth));
    height: calc(100vh - var(--nav-height));
    margin: var(--nav-height) var(--scrollwidth) 0 0;
    z-index: 6;
    backdrop-filter: blur(4px);
  }
`;

const NavLink = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
  color: var(--text-color);
`;
