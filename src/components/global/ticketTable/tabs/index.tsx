import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTabIndex,
  selectTabIndex,
} from "../../../../app/flux/slices/tableSlice";
import { selectUserRank } from "../../../../app/flux/slices/authSlice";
import Icon from "@material-ui/core/Icon";
import { Tab } from "../../../../app/constants";
import { TabContainer, TabSet, TableTab } from "./styles";

export default ({ tabSet }: { tabSet: Tab[] }) => {
  const userRank = useSelector(selectUserRank);
  const selectedIndex = useSelector(selectTabIndex);
  const dispatch = useDispatch();
  const tabs = tabSet
    .filter((tab) => userRank >= tab.requiredRank)
    .map((tab, index) => (
      <TableTab
        key={tab.title}
        className={index === selectedIndex ? "selected" : ""}
        onClick={() => dispatch(setTabIndex(index))}
        userRank={userRank}
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
