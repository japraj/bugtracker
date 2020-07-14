import React from "react";
import TopNavigation from "./subcomponents/TopNavigation";
import SideNavigation from "./subcomponents/SideNavigation";

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

const LogoutItem: NavigationItem = {
  path: "",
  iconClassNames: "fas fa-sign-out-alt",
  text: "Logout",
};

const defaultNavSet: NavigationItem[] = [HomeItem, LoginItem, RegisterItem];

const authNavSet: NavigationItem[] = [HomeItem, DashboardItem, LogoutItem];

export default () => {
  const collapsed: boolean = false;
  const authenticated: boolean = false;
  const collapsedWidth: number = 70;
  const extendedWidth: number = 180;
  return (
    <React.Fragment>
      <TopNavigation expandSideNav={() => console.log("clicked")} />
      <SideNavigation
        collapsed={collapsed}
        {...{ collapsedWidth, extendedWidth }}
        navItemSet={authenticated ? authNavSet : defaultNavSet}
      />
    </React.Fragment>
  );
};
