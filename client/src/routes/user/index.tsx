import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadUserByTag,
  selectLoadState,
  selectActivity,
  selectTickets,
} from "../../flux/slices/userSlice";
import ProfileCard from "./profileCard";
import Rank from "./rank";
import Update from "./update";
import IterableWidget from "../../components/global/iterableWidget";
import CollapsedTicketComp from "../../components/global/collapsedTicket";
import RecentActivity from "../../components/global/recentActivity";
import { Notification } from "../../constants/notification";
import { CollapsedTicket } from "../../constants/ticket";
import styled from "styled-components";
import LoadingRing from "../../components/global/loadingRing/LoadingRing";
import { Container, WidgetColumn, WidgetRow } from "./styles";

const LoadWrapper = styled.div`
  position: fixed;
  left: calc(0.5 * (100vw - 152.2px));
  top: 35vh;

  @media (max-width: 600px) {
    position: static;
    padding-top: 25vh;
    height: calc(100vh - var(--nav-height) - var(--mobile-nav-height) - 1.5rem);
  }
`;

export default ({ match }: { match: any }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUserByTag(match.params.tag));
  }, [dispatch, match.params.tag]);
  const loading: boolean = useSelector(selectLoadState);
  // remove notifications related to avatar and rank updates
  const recentActivity: Notification[] = useSelector(selectActivity).filter(
    (notification) => notification.message < 11
  );
  const tickets: CollapsedTicket[] = useSelector(selectTickets);

  return loading ? (
    <LoadWrapper>
      <LoadingRing />
    </LoadWrapper>
  ) : (
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
        wrapperElement={CollapsedTicketComp}
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
