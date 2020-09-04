import React from "react";
import { useSelector } from "react-redux";
import { selectRecentActivity } from "../../flux/slices/homeSlice";
import { selectElementsByKeys } from "../../flux/slices/contextSlice";
import { Notification, sortNotifications } from "../../constants/notification";
import RecentActivity from "./recentActivity";
import Table from "./ticketTable";
import CreateLink from "./createLink";
import { HomeWrapper, Aside, MiscContainer } from "./styles";

export default () => {
  const ids: string[] = useSelector(selectRecentActivity).map((i: number) =>
    i.toString()
  );
  const notificationSet: Notification[] = sortNotifications(
    useSelector(selectElementsByKeys("activity"))(ids),
    true
  );
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
