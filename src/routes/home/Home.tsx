import React from "react";
import styled from "styled-components";
import RecentActivity from "./recentActivity/RecentActivityWrapper";
import { Activity } from "./recentActivity/Activity";
import TableTicket from "../../components/collapsedTicket/CollapsedTicket";
import Table from "../../components/table/TicketTable";

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
export default class extends React.Component<{}, {}> {
  fetchTickets = (): React.ReactNode[] => {
    let ticketSet: React.ReactNode[] = [];
    for (let i = 0; i < 20; i++) {
      ticketSet.push(
        <TableTicket
          ticket={{
            author: Math.random().toString(36).substr(2, 22),
            creationDate: Math.random().toString(36).substr(2, 15),
            title:
              "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione vitae occaecati aut. Fugit quia voluptatem officia ut voluptatem eveniet. Dolorum consectetur officia cum. Sed voluptatibus asperiores quibusdam non unde ducimus minima.",
            severity: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
            status: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
          }}
        />
      );
    }
    return ticketSet;
  };

  resolvedCallback = () => {};

  render() {
    return (
      <HomeWrapper>
        <Table
          className="tableContainer"
          iconClassName="fa fa-ticket-alt"
          tableTitle="New Tickets"
          buttonCallback={this.resolvedCallback}
          nodeSet={this.fetchTickets()}
        />
        <RecentActivity activitySet={activitySet} />
        <Table
          className="tableContainer"
          iconClassName="fas fa-tasks"
          tableTitle="Resolved Tickets"
          buttonCallback={() => {}}
          nodeSet={this.fetchTickets()}
        />
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

  .tableContainer {
    width: 45vw;
  }
`;
