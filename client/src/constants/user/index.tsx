export interface Notification {
  id: number;
  date: string;
  author: string;
  message: string;
  ticketId: string;
  new: boolean;
}
// A notification is just a record of a change
// that was applied to an issue.

export interface UserInfo {
  profileImg: string;
  tag: string;
  rank: number;
}
// Global User Object, used for UserLinks/author of an issue.
//  Note: tags are unique!

export interface User {
  authenticated: boolean;
  notifications: Notification[];
  info: UserInfo;
}
// Local User (the user that is using the client)

export interface RankObject {
  // numeric representation
  numeric: number;
  name: string;
  // Background-color of the badge that appears in the popper
  badgeColor: string;
  // Username h1 text-color
  nameColor: string;
}

export const Ranks: RankObject[] = [
  {
    numeric: 0,
    name: "Blacklisted",
    badgeColor: "null",
    nameColor: "lightgrey",
  },
  {
    numeric: 1,
    name: "User",
    badgeColor: "grey",
    nameColor: "white",
  },
  {
    numeric: 2,
    name: "Developer",
    badgeColor: "lightblue",
    nameColor: "brightblue",
  },
  {
    numeric: 3,
    name: "Manager",
    badgeColor: "lightgreen",
    nameColor: "brightgreen",
  },
  {
    numeric: 4,
    name: "Admin",
    badgeColor: "darkred",
    nameColor: "darkred",
  },
];

export const getRankObj = (index: number): RankObject => {
  if (index < 0 || index > 4) throw new Error("Index out of range");
  return Ranks.find((rank: RankObject) => rank.numeric === index)!;
};

export enum Rank {
  Blacklisted,
  User,
  Developer,
  Manager,
  Admin,
}
