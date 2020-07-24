import React from "react";
import { useLocation } from "react-router-dom";
import { NavigationItem } from "../NavigationWrapper";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import Icon from "@material-ui/core/Icon";

export default ({
  collapsed,
  collapsedWidth,
  extendedWidth,
  navItemSet,
  toggleCollapsed,
  logout,
  logoutItem,
}: {
  collapsed: boolean;
  collapsedWidth: number;
  extendedWidth: number;
  navItemSet: NavigationItem[];
  toggleCollapsed: () => void;
  logout: () => void;
  logoutItem: NavigationItem;
}) => {
  const location = useLocation().pathname;
  const NavLinkSet = navItemSet.map((navItem) =>
    // Do not display the logout item for mobile bottom nav
    window.innerWidth < 600 && navItem === logoutItem ? (
      <React.Fragment key={navItem.text} />
    ) : (
      <NavLink
        key={navItem.text}
        to={"/" + navItem.path}
        onClick={() => {
          // On mobile, we automatically close the nav
          // when a user clicks on a link.
          if (window.innerWidth < 600) toggleCollapsed();
          // Logout
          if (navItem === logoutItem) logout();
        }}
      >
        <ButtonBase
          // ButtonBase gives the ripple effect
          focusRipple
          style={{
            width: collapsed ? collapsedWidth : extendedWidth,
            height: "100%",
            fontFamily: "Roboto",
          }}
        >
          <li
            className={`${window.innerWidth > 600 ? "hoverfx3" : ""} ${
              // The logout item can not be selected
              navItem === logoutItem
                ? ""
                : // Nested ternary; the below line/expression is actually the condition
                "/" + navItem.path === location
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
    )
  );
  return (
    <React.Fragment>
      <SideNav
        collapsed={collapsed}
        sideNavWidth={collapsed ? collapsedWidth : extendedWidth}
      >
        <Profile
          showNotificationsOnly={false}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          className="profileWrapper"
        />
        {window.innerWidth < 600 && collapsed ? (
          <div className="mobileNavigationWidget">
            <ul>{NavLinkSet}</ul>
            <div className="mobileProfileWrapper">
              <Profile
                showNotificationsOnly={true}
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
                className=""
              />
            </div>
          </div>
        ) : (
          <ul>{NavLinkSet}</ul>
        )}
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
          : "width: 172px; margin: 5rem auto 1rem;"}
    }

    ul {
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
const GlassDiv = styled.div`
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

const NavLink = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
  color: var(--text-color);
`;
