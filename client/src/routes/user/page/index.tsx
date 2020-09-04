import React from "react";
import Routes from "../../../constants/routes";
import { useSelector } from "react-redux";
import {
  selectUserInfo,
  selectActivity,
  selectTickets,
} from "../../../flux/slices/userSlice";
import history from "../../history";
import ProfileCard from "../profileCard";
import Rank from "../rank";
import Update from "../update";
import IterableWidget from "../../../components/global/iterableWidget";
import CollapsedTicket from "../../../components/global/collapsedTicket";
import RecentActivity from "../../home/recentActivity";
import { Container, WidgetColumn, WidgetRow } from "./styles";

export default () => {
  const user = useSelector(selectUserInfo);
  const recentActivity = useSelector(selectActivity);
  const tickets = useSelector(selectTickets);
  if (!user.tag) {
    history.push(Routes.DNE404);
    return <React.Fragment />;
  }

  return (
    <Container>
      <WidgetColumn>
        <WidgetRow>
          <ProfileCard />
          <Rank />
        </WidgetRow>
        <Update />
      </WidgetColumn>
      <IterableWidget
        className="ticketSet"
        iconName="confirmation_number"
        title="Issues"
        elementsPerPage={window.innerWidth < 800 ? 5 : 4}
        set={tickets}
        wrapperElement={CollapsedTicket}
        defaultProps={{}}
        elementPropName="ticket"
        emptySetFallback="This user has not yet submitted any issues"
      />
      <RecentActivity
        notificationSet={recentActivity}
        className="recentActivity"
        nodeClassName="activityNode"
      />
    </Container>
  );
};
