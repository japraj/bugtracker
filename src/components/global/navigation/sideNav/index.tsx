import React from "react";
import { useLocation } from "react-router-dom";
import { NavigationItem } from "..";
import Profile from "../../profile";
import ButtonBase from "@material-ui/core/ButtonBase";
import Icon from "@material-ui/core/Icon";
import { SideNav, GlassPane, NavLink } from "./styles";

export default ({
  authenticated,
  collapsed,
  collapsedWidth,
  extendedWidth,
  navItemSet,
  toggleCollapsed,
  logout,
  logoutItem,
}: {
  authenticated: boolean;
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
    window.innerWidth < 600 && navItem === logoutItem && collapsed ? (
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
            {authenticated ? (
              <div className="mobileProfileWrapper">
                <Profile
                  showNotificationsOnly={true}
                  collapsed={collapsed}
                  toggleCollapsed={toggleCollapsed}
                  className=""
                />
              </div>
            ) : (
              <React.Fragment />
            )}
          </div>
        ) : (
          <ul>{NavLinkSet}</ul>
        )}
      </SideNav>
      <GlassPane {...{ collapsed }} onClick={toggleCollapsed} />
    </React.Fragment>
  );
};
