import React from "react";
import { NavigationItem } from "../NavigationDisplay";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props: { sideNavWidth: number }) => props.sideNavWidth}px;
  height: 100vh;
  margin-top: var(--nav-height);
  background-color: var(--vert-nav-bg);
  z-index: 7;

  ul {
    padding-top: 0.8rem;
  }

  ul li {
    margin-bottom: 1.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0.3rem 0;
  }
`;

const NavLink = styled(Link)`
  margin: 0 auto;
  ${(props: { collapsed: boolean }) =>
    props.collapsed
      ? `
        font-size: 1.8rem;
      `
      : `
      font-size: 1.35rem;
      margin-left: 0;
      padding-left: 0.8rem;
      text-decoration:none;
      color: var(--text-color);
      `}
`;

export default ({
  collapsed,
  collapsedWidth,
  extendedWidth,
  navItemSet,
}: {
  collapsed: boolean;
  collapsedWidth: number;
  extendedWidth: number;
  navItemSet: NavigationItem[];
}) => {
  const NavLinkSet = navItemSet.map((navItem) => (
    <NavLink to={"/" + navItem.path} {...{ collapsed }}>
      <li className="hoverfx" key={navItem.text}>
        <i className={navItem.iconClassNames + " inline-icon"} />
        {collapsed ? "" : navItem.text}
      </li>
    </NavLink>
  ));
  return (
    <SideNav sideNavWidth={collapsed ? collapsedWidth : extendedWidth}>
      <ul>{NavLinkSet}</ul>
    </SideNav>
  );
};
