import React from "react";
import styled from "styled-components";
import RecentActivity from "./recentActivity/RecentActivityWrapper";
import { Activity } from "./recentActivity/Activity";

const activitySet: Activity[] = [];
for (let i = 0; i < 10; i++) {
  activitySet.push({
    avatarUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9BgnL75oBYrWpn7bZ069YwHaE8%26pid%3DApi&f=1]",
    username: "Infamous",
    description:
      "commented on a ticket and created an issue reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  });
}

export default () => {
  return (
    <HomeWrapper>
      <RecentActivity activitySet={activitySet} />
      <RecentActivity activitySet={activitySet} />
      <RecentActivity activitySet={activitySet} />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.section`
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 20vw;
  width: 100%;
  height: auto;
`;
