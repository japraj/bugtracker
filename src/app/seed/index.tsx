import { CollapsedTicket } from "../../components/global/collapsedTicket";
import { Notification, UserInfo } from "../flux/slices/authSlice";

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

const generateUserInfo = (): UserInfo => {
  return {
    tag: Math.random().toString(36).substr(2, 22),
    profileImg: generateImage(),
    rank: Math.abs(Math.floor(Math.random() * 4 - 0.01)),
  };
};

const generateNotification = (): Notification => {
  return {
    to: `/issues/${Math.random().toString(36).substr(2, 22)}`,
    author: generateUserInfo(),
    message: "commented on issue 'There is too much Yeet.'",
    new: Math.random() < 0.5,
  };
};

export const generateNotificationSet = (): Notification[] => {
  let notificationSet: Notification[] = [];
  for (let i = 0; i < 10; i++) {
    notificationSet.push(generateNotification());
  }
  return notificationSet;
};

const generateTicket = (): CollapsedTicket => {
  return {
    userInfo: generateUserInfo(),
    creationDate: Math.random().toString(36).substr(2, 15),
    title:
      "Quam error accusamus rem modi sunt molestiae iure sunt. Beatae aut incidunt placeat et ratione vitae occaecati aut. Fugit quia voluptatem officia ut voluptatem eveniet. Dolorum consectetur officia cum. Sed voluptatibus asperiores quibusdam non unde ducimus minima.",
    severity: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
    status: Math.abs(Math.floor(Math.random() * 3 - 0.01)),
    comments: Math.floor(Math.random() * 999),
  };
};

export const generateTicketSet = (): CollapsedTicket[] => {
  let ticketSet: CollapsedTicket[] = [];
  for (let i = 0; i < 20; i++) {
    ticketSet.push(generateTicket());
  }
  return ticketSet;
};
