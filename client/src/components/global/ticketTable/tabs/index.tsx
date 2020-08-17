import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTabIndex,
  selectTabIndex,
} from "../../../../flux/slices/tableSlice";
import { selectAuthSlice } from "../../../../flux/slices/authSlice";
import Icon from "@material-ui/core/Icon";
import { Tab } from "../../../../constants/table";
import { TabContainer, TabSet, TableTab } from "./styles";

export default ({ tabSet }: { tabSet: Tab[] }) => {
  const authSlice = useSelector(selectAuthSlice);
  const userRank: number = authSlice.user.authenticated
    ? authSlice.user.info.rank
    : -1;
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
