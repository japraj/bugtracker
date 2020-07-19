import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default ({ expandSideNav }: { expandSideNav: () => void }) => {
  return (
    <TopNav>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={expandSideNav}
      >
        <MenuIcon style={{ fontSize: "2.25rem" }} />
      </IconButton>
      <Label>
        <i className="fas fa-bug inline-icon" />
        Bug Tracker
      </Label>
    </TopNav>
  );
};

const TopNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  width: 100vw;
  height: var(--nav-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--nav-bg);
  z-index: 8;
  color: var(--text-color);
  border-bottom: 1px solid var(--dark);
  border-right: var(--scrollwidth) solid rgba(0, 0, 0, 0.8);
`;

const Label = styled.h1`
  font-size: 1.25rem;
  margin: 0 auto;
  transform: translateX(-30px);
`;
// Note: label is translated 30px left to perfectly center it; the IconButton is 60px wide.
