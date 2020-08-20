import React from "react";
import TopNavigation from "./topNav";
import SideNavigation from "./sideNav";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthenticated, logout } from "../../../flux/slices/authSlice";
import {
  toggleCollapse,
  selectCollapsed,
} from "../../../flux/slices/navigationSlice";
import { collapsedWidth, extendedWidth } from "../../../constants/navigation";
import history from "../../../routes/history";
import Endpoints from "../../../constants/api";
import Routes from "../../../constants/routes";
import { toast } from "react-toastify";

export type NavigationItem = {
  path: string;
  iconName: string;
  text: string;
};

const HomeItem: NavigationItem = {
  path: Routes.HOME,
  iconName: "home",
  text: "Home",
};

const LoginItem: NavigationItem = {
  path: Routes.LOGIN,
  iconName: "vpn_key",
  text: "Login",
};

const RegisterItem: NavigationItem = {
  path: Routes.REGISTER,
  iconName: "person_add",
  text: "Register",
};

const DashboardItem: NavigationItem = {
  path: Routes.DASHBOARD,
  iconName: "equalizer",
  text: "Dashboard",
};

const LogoutItem: NavigationItem = {
  path: Routes.HOME,
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
  const toggle = () => dispatch(toggleCollapse());
  return (
    <React.Fragment>
      <TopNavigation expandSideNav={toggle} />
      <SideNavigation
        {...{ authenticated, collapsed, collapsedWidth, extendedWidth }}
        navItemSet={authenticated ? authNavSet : defaultNavSet}
        toggleCollapsed={collapsed ? () => {} : toggle}
        logout={() => {
          fetch(Endpoints.LOGOUT, { method: "POST" })
            .then(() => {
              dispatch(logout());
              history.push(Routes.HOME);
            })
            .catch(() =>
              toast.error("Oops, something went wrong! Please try again.")
            );
        }}
        logoutItem={LogoutItem}
      />
    </React.Fragment>
  );
};
