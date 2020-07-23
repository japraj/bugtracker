import React from "react";
import styled from "styled-components";
import RecentActivity from "./recentActivity/RecentActivityWrapper";
import { Activity } from "./recentActivity/Activity";
import Table from "./table/TicketTable";
import { CollapsedTicket } from "../../components/global/collapsedTicket/CollapsedTicket";
import CreateLink from "./createLink/CreateLink";

const generateImage = () => {
  const gen = Math.random();
  if (gen < 0.2)
    return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9BgnL75oBYrWpn7bZ069YwHaE8%26pid%3DApi&f=1]";
  if (gen < 0.4)
    return "https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg";
  if (gen < 0.6)
    return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YKJaSfsDX_T_Ikyzjvf7OAHaFM%26pid%3DApi&f=1";
  if (gen < 0.8)
    return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LCdzf1w2ePH83eOerEY9LAFNC7%26pid%3DApi&f=1";
  return "";
};

const activitySet: Activity[] = [];
for (let i = 0; i < 10; i++) {
  activitySet.push({
    userInfo: {
      userTag: Math.random().toString(36).substr(2, 22),
      profileImg: generateImage(),
      userRank: Math.abs(Math.floor(Math.random() * 4 - 0.01)),
    },
    description:
      "commented on a ticket reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  });
}

export default class extends React.Component<{}, {}> {
  fetchTickets = (): CollapsedTicket[] => {
    let ticketSet: CollapsedTicket[] = [];
    for (let i = 0; i < 20; i++) {
      ticketSet.push({
        userInfo: {
          userTag: Math.random().toString(36).substr(2, 22),
          profileImg: generateImage(),
          userRank: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
        },
        creationDate: Math.random().toString(36).substr(2, 15),
        title:
          "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione vitae occaecati aut. Fugit quia voluptatem officia ut voluptatem eveniet. Dolorum consectetur officia cum. Sed voluptatibus asperiores quibusdam non unde ducimus minima.",
        severity: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
        status: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
        comments: Math.floor(Math.random() * 999),
      });
    }
    return ticketSet;
  };

  resolvedCallback = () => {};

  render() {
    return (
      <HomeWrapper>
        <Table
          className="tableContainer"
          buttonCallback={this.resolvedCallback}
          ticketSet={this.fetchTickets()}
        />
        <div className="asideContainer">
          <RecentActivity
            className="recentActivity"
            activitySet={activitySet}
          />
          <CreateLink />
        </div>
      </HomeWrapper>
    );
  }
}

const HomeWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 20vw;
  width: 100%;
  height: auto;

  @media (min-width: 1101px) {
    .asideContainer,
    .recentActivity {
      width: 400px;
    }

    .recentActivity {
      margin-bottom: 1.5rem;
    }
  }

  .tableContainer {
    min-width: 880px;
    width: 45vw;
  }

  .asideContainer {
    margin-bottom: auto;
  }

  @media (min-width: 1101px) and (max-width: 1575px) {
    padding: 0 1rem;
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;

    .tableContainer,
    .asideContainer {
      width: 98%;
    }

    .asideContainer {
      .recentActivity {
        margin-right: 1.5rem;
      }

      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
  }

  @media (max-width: 1100px) {
    padding: 0 1rem;
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;

    .tableContainer,
    .asideContainer {
      width: 95vw;
      margin: 0 auto;
    }
  }
`;
