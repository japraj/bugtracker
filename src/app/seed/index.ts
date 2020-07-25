import { CollapsedTicket } from "../../components/global/collapsedTicket";
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
    to: `/issues/${randomString()}`,
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

const generateTicket = (): CollapsedTicket => {
  return {
    userInfo: getRandom(User),
    creationDate: randomString(),
    title:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione vitae occaecati aut. Fugit quia voluptatem officia ut voluptatem eveniet. Dolorum consectetur officia cum. Sed voluptatibus asperiores quibusdam non unde ducimus minima.",
    severity: randomNum(3),
    status: randomNum(2),
    comments: randomNum(99),
  };
};

export const generateTicketSet = (howMany: number): CollapsedTicket[] => {
  let ticketSet: CollapsedTicket[] = [];
  for (let i = 0; i < howMany; i++) ticketSet.push(generateTicket());
  return ticketSet;
};
