import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelected, selectCurrentIndex } from "./tableSlice";
import { WidgetHeader } from "../widget/Widget";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

export interface Tab {
  iconName: string;
  title: string;
  requiredRank: number;
}

export default ({ tabSet }: { tabSet: Tab[] }) => {
  const selectedIndex = useSelector(selectCurrentIndex);
  const dispatch = useDispatch();
  const tabs = tabSet.map((tab, index) => (
    <TableTab
      className={index === selectedIndex ? "selected" : ""}
      key={tab.title}
      onClick={() => dispatch(setSelected(index))}
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
  padding: 0;
  border-bottom: 1px solid transparent;
  background-color: rgba(0, 0, 0, 0.2);

  .selected {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const TabSet = styled.ul`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  li:first-of-type {
    border-top-left-radius: 5px;
  }
`;

const TableTab = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.15);
  }

  .inline-icon {
    margin-left: 0;
  }
`;
