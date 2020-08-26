import React from "react";
import { useSelector } from "react-redux";
import { selectRecentActivity } from "../../flux/slices/homeSlice";
import { selectElementsByKeys } from "../../flux/slices/contextSlice";
import { Notification } from "../../constants/notification";
import RecentActivity from "../../components/global/recentActivity";
import Table from "../../components/global/ticketTable";
import CreateLink from "./createLink";
import { HomeWrapper, Aside, MiscContainer } from "./styles";

export default () => {
  const ids: string[] = useSelector(selectRecentActivity).map((i: number) =>
    i.toString()
  );
  const notificationSet: Notification[] = useSelector(
    selectElementsByKeys("activity")
  )(ids);
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
