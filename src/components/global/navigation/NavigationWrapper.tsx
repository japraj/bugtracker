import React from "react";
import TopNavigation from "./subcomponents/TopNavigation";
import SideNavigation from "./subcomponents/SideNavigation";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCollapse,
  selectCollapsed,
  collapsedWidth,
  extendedWidth,
} from "./NavigationSlice";

export type NavigationItem = {
  path: string;
  iconClassNames: string;
  text: string;
};

const HomeItem: NavigationItem = {
  path: "",
  iconClassNames: "fas fa-home",
  text: "Home",
};

const LoginItem: NavigationItem = {
  path: "login",
  iconClassNames: "fas fa-sign-in-alt",
  text: "Login",
};

const RegisterItem: NavigationItem = {
  path: "register",
  iconClassNames: "fa fa-user-plus",
  text: "Register",
};

const DashboardItem: NavigationItem = {
  path: "dashboard",
  iconClassNames: "fas fa-user",
  text: "Dashboard",
};

export const LogoutItem: NavigationItem = {
  path: "",
  iconClassNames: "fas fa-sign-out-alt",
  text: "Logout",
};

const defaultNavSet: NavigationItem[] = [HomeItem, LoginItem, RegisterItem];
const authNavSet: NavigationItem[] = [HomeItem, DashboardItem, LogoutItem];

export default ({ authenticated }: { authenticated: boolean }) => {
  const dispatch = useDispatch();
  const collapsed: boolean = useSelector(selectCollapsed);
  const toggle = () => dispatch(toggleCollapse());
  return (
    <React.Fragment>
      <TopNavigation expandSideNav={toggle} />
      <SideNavigation
        collapsed={collapsed}
        {...{ collapsedWidth, extendedWidth }}
        navItemSet={authenticated ? authNavSet : defaultNavSet}
        toggleCollapsed={collapsed ? () => {} : toggle}
        logout={() => {
          // Logout logic
          console.log("Logout");
        }}
      />
    </React.Fragment>
  );
};
