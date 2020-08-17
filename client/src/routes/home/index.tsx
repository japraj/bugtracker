import React from "react";
import { useSelector } from "react-redux";
import { selectRecentActivity } from "../../flux/slices/homeSlice";
import RecentActivity from "../../components/global/recentActivity";
import Table from "../../components/global/ticketTable";
import CreateLink from "./createLink";
import { HomeWrapper, Aside, MiscContainer } from "./styles";

export default () => {
  const notificationSet = useSelector(selectRecentActivity);
  return (
    <HomeWrapper>
      <Table className="tableContainer" />
      <Aside>
        <RecentActivity
          className="recentActivity"
          notificationSet={notificationSet}
        />
        <MiscContainer>
          <CreateLink />
        </MiscContainer>
      </Aside>
    </HomeWrapper>
  );
};
