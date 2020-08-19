import { CollapsedTicket, Ticket } from "../constants/ticket";
import { UserInfo } from "../constants/user";
import { Notification } from "../constants/notification";
import {
  User,
  NotificationMessage,
  getRandom,
  randomNum,
  randomString,
  randomBool,
} from "./predefined";

export const generateUserSet = (howMany: number): UserInfo[] => {
  let userSet: UserInfo[] = [];
  for (let i = 0; i < howMany; i++) userSet.push(getRandom(User));
  return userSet;
};

const generateNotification = (): Notification => {
  return {
    id: randomNum(1000),
    ticketId: Math.random() < 0.25 ? "null" : randomString(),
    date: "99/99/9999",
    author: getRandom(User).tag,
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
    typeLabel: randomNum(2),
    title:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione vitae occaecati aut. Fugit quia voluptatem officia ut voluptatem eveniet. Dolorum consectetur officia cum. Sed voluptatibus asperiores quibusdam non unde ducimus minima.",
    author: getRandom(User).tag,
    updateDate: randomNum(1000),
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
    typeLabel: randomNum(2),
    title:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione",
    author: getRandom(User).tag,
    creationDate: randomNum(1000),
    updateDate: randomNum(1000),
    description:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et rationeQuam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione",
    reproducibility: randomNum(2),
    severity: randomNum(2),
    status: randomNum(2),
    assignees: [
      User[0].tag,
      User[1].tag,
      User[2].tag,
      User[3].tag,
      User[4].tag,
    ],
    imageLinks: [
      randomString() +
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7%26pid%3DApi&f=1",
      randomString(),
      randomString(),
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lY_aBb-eS63mPvz0-Jk8xAHaFj%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.foHhqoYr9QQbQgVQQCWFFQHaEo%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.W4tnaUqnR-WzQOyc0dqvEgHaEK%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.eV1yBtQ0xPhr0n56ewhcxwHaFj%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Ht-rJ2jpxs6obcf4Q7YoHgHaEo%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-O9sV29ek_6WabRw9G5WgQHaEK%26pid%3DApi&f=1",
    ],
    activity: generateNotificationSet(10),
  };
};
