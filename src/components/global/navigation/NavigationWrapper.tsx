import React from "react";
import TopNavigation from "./TopNavigation";
import SideNavigation from "./SideNavigation";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCollapse,
  selectCollapsed,
  collapsedWidth,
  extendedWidth,
} from "./navigationSlice";

export type NavigationItem = {
  path: string;
  iconName: string;
  text: string;
};

const HomeItem: NavigationItem = {
  path: "",
  iconName: "home",
  text: "Home",
};

const LoginItem: NavigationItem = {
  path: "login",
  iconName: "vpn_key",
  text: "Login",
};

const RegisterItem: NavigationItem = {
  path: "register",
  iconName: "person_add",
  text: "Register",
};

const DashboardItem: NavigationItem = {
  path: "dashboard",
  iconName: "person",
  text: "Dashboard",
};

export const LogoutItem: NavigationItem = {
  path: "",
  iconName: "exit_to_app_sharp",
  text: "Logout",
};

const defaultNavSet: NavigationItem[] = [HomeItem, LoginItem, RegisterItem];
const authNavSet: NavigationItem[] = [HomeItem, DashboardItem, LogoutItem];

export default ({ authenticated }: { authenticated: boolean }) => {
  const dispatch = useDispatch();
  const collapsed: boolean = useSelector(selectCollapsed);
  const toggle = () => {
    document.documentElement.style.setProperty(
      "--rs-alert-offset",
      !collapsed ? "26.5px" : "87.5px"
    );
    dispatch(toggleCollapse());
  };
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
