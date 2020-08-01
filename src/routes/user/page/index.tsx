import React from "react";
import { useSelector } from "react-redux";
import {
  selectUserInfo,
  selectActivity,
  selectTickets,
} from "../../../app/flux/slices/userSlice";
import history from "../../history";
import ProfileCard from "../profileCard";
import Update from "../update";
import IterableWidget from "../../../components/global/iterableWidget";
import CollapsedTicket from "../../../components/global/collapsedTicket";
import RecentActivity from "../../../components/global/recentActivity";
import styled from "styled-components";

export default () => {
  const user = useSelector(selectUserInfo);
  const recentActivity = useSelector(selectActivity);
  const tickets = useSelector(selectTickets);
  if (!user.tag) history.push("/404");

  return (
    <Container>
      <StackedWidgets>
        <ProfileCard />
        <Update />
      </StackedWidgets>
      <RecentActivity
        notificationSet={recentActivity}
        className="recentActivity"
      />
      <IterableWidget
        className={"ticketSet"}
        iconName="confirmation_number"
        title="Issues"
        elementsPerPage={5}
        set={tickets}
        wrapperElement={CollapsedTicket}
        defaultProps={{}}
        elementPropName="ticket"
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 95vw;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  h1 {
    margin-left: 0.5rem;
  }

  .recentActivity,
  .ticketSet {
    margin: 0 auto;
    width: 95%;
  }
`;

const StackedWidgets = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
