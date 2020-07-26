import { CollapsedTicket } from "../flux/slices/tableSlice";
import { Ticket } from "../flux/slices/ticketSlice";
import { Notification } from "../flux/slices/authSlice";
import {
  User,
  NotificationMessage,
  getRandom,
  randomNum,
  randomString,
  randomBool,
} from "./predefined";

const generateNotification = (): Notification => {
  return {
    ticketId: randomString(),
    author: getRandom(User),
    message: getRandom(NotificationMessage),
    new: randomBool(),
  };
};

export const generateNotificationSet = (howMany: number): Notification[] => {
  let notificationSet: Notification[] = [];
  for (let i = 0; i < howMany; i++)
    notificationSet.push(generateNotification());
  return notificationSet;
};

const generateCollapsedTicket = (): CollapsedTicket => {
  return {
    id: randomString(),
    author: getRandom(User),
    updateDate: randomNum(1000),
    title:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione vitae occaecati aut. Fugit quia voluptatem officia ut voluptatem eveniet. Dolorum consectetur officia cum. Sed voluptatibus asperiores quibusdam non unde ducimus minima.",
    severity: randomNum(2),
    status: randomNum(2),
    comments: randomNum(99),
  };
};

export const generateTicketSet = (howMany: number): CollapsedTicket[] => {
  let ticketSet: CollapsedTicket[] = [];
  for (let i = 0; i < howMany; i++) ticketSet.push(generateCollapsedTicket());
  return ticketSet;
};

export const generateTicket = (): Ticket => {
  return {
    id: randomString(),
    author: getRandom(User),
    creationDate: randomNum(1000),
    updateDate: randomNum(1000),
    title:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione",
    description:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione",
    reproducibility: randomNum(2),
    severity: randomNum(2),
    status: randomNum(2),
    assignees: [
      getRandom(User),
      getRandom(User),
      getRandom(User),
      getRandom(User),
      getRandom(User),
      getRandom(User),
      getRandom(User),
      getRandom(User),
    ],
    imageLinks: [
      randomString(),
      randomString(),
      randomString(),
      randomString(),
      randomString(),
    ],
    comments: generateNotificationSet(10),
  };
};
