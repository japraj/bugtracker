import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../../logo";
import { TopNav, Label } from "./styles";

export default ({ expandSideNav }: { expandSideNav: () => void }) => {
  return (
    <TopNav>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={expandSideNav}
      >
        <MenuIcon
          style={{ fontSize: window.innerWidth < 600 ? "1.5rem" : "2.25rem" }}
        />
      </IconButton>
      <Label>
        <Logo className="inline-icon" />
        Bug Tracker
      </Label>
    </TopNav>
  );
};
