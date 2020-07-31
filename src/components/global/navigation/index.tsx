import React from "react";
import TopNavigation from "./topNav";
import SideNavigation from "./sideNav";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthenticated,
  logout,
} from "../../../app/flux/slices/authSlice";
import {
  toggleCollapse,
  selectCollapsed,
} from "../../../app/flux/slices/navigationSlice";
import { collapsedWidth, extendedWidth } from "../../../app/constants";

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

const LogoutItem: NavigationItem = {
  path: "",
  iconName: "exit_to_app_sharp",
  text: "Logout",
};

const defaultNavSet: NavigationItem[] = [HomeItem, LoginItem, RegisterItem];
const authNavSet: NavigationItem[] = [HomeItem, DashboardItem, LogoutItem];

// Container class for SideNav and TopNav, meant to handle the logic
// for both components.
export default () => {
  const dispatch = useDispatch();
  const authenticated: boolean = useSelector(selectAuthenticated);
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
        logout={() => dispatch(logout())}
        logoutItem={LogoutItem}
      />
    </React.Fragment>
  );
};
