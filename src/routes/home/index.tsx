import React from "react";
import { useSelector } from "react-redux";
import { selectRecentActivity } from "../../app/flux/slices/homeSlice";
import RecentActivity from "./recentActivity";
import Table from "../../components/global/ticketTable";
import CreateLink from "./createLink";
import { HomeWrapper } from "./styles";

export default () => {
  const notificationSet = useSelector(selectRecentActivity);
  return (
    <HomeWrapper>
      <Table className="tableContainer" />
      <div className="asideContainer">
        <RecentActivity
          className="recentActivity"
          notificationSet={notificationSet}
        />
        <CreateLink />
      </div>
    </HomeWrapper>
  );
};
