import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTabIndex, selectTabIndex } from "./tableSlice";
import { selectUserPermissions } from "../../../app/flux/auth/authSlice";
import { WidgetHeader } from "../../../components/container/widget/Widget";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

export interface Tab {
  iconName: string;
  title: string;
  requiredRank: number;
}

export default ({ tabSet }: { tabSet: Tab[] }) => {
  const userPerms = useSelector(selectUserPermissions);
  const selectedIndex = useSelector(selectTabIndex);
  const dispatch = useDispatch();
  const tabs = tabSet
    .filter((tab) => userPerms >= tab.requiredRank)
    .map((tab, index) => (
      <TableTab
        key={tab.title}
        className={index === selectedIndex ? "selected" : ""}
        onClick={() => dispatch(setTabIndex(index))}
        userPerms={userPerms}
      >
        <Icon className="inline-icon">{tab.iconName}</Icon>
        <h1>{tab.title}</h1>
      </TableTab>
    ));
  return (
    <TabContainer>
      <TabSet>{tabs}</TabSet>
    </TabContainer>
  );
};

const TabContainer = styled(WidgetHeader)`
  padding: 0 !important;
  border-bottom: 1px solid transparent;
  background-color: rgba(0, 0, 0, 0.15);

  .selected,
  .selected:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const TabSet = styled.ul`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;

  li:first-of-type {
    border-top-left-radius: 5px;
  }

  @media (max-width: 870px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const TableTab = styled.li`
  height: 48px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .inline-icon {
    margin-left: 0;
  }

  @media (max-width: 1100px) {
    h1,
    .inline-icon {
      font-size: 1rem;
    }
  }

  @media (max-width: 870px) {
    ${(props: { userPerms: number }) =>
      props.userPerms > 0 ? `border: 1px solid rgba(0, 0, 0, 0.1);` : ``}
    border-top: none;

    .selected {
      border: none;
    }
  }

  @media (max-width: 600px) {
    padding: 1rem 0.7rem;

    h1,
    .inline-icon {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 300px) {
    h1,
    .inline-icon {
      font-size: 0.6rem;
    }
  }

  ${(props: { userPerms: number }) =>
    props.userPerms !== 1
      ? `
        :nth-last-child(1),
        :nth-last-child(2),
        :nth-last-child(3) {
          border-bottom: none;
        }`
      : `
        :nth-last-child(1),
        :nth-last-child(2) {
          border-bottom: none;
        }`}
`;
