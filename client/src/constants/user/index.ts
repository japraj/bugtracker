import { Notification } from "../notification";

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
  tickets: number[];
  assigned: number[];
  info: UserInfo;
}
// Local User (the user that is using the client)

export const getUserFromDTO = (dto: any) =>
  Object.assign({
    tag: dto.tag,
    profileImg: dto.avatar,
    rank: dto.rank,
  });

export const generateLocalUserFromDTO = (
  dto: any,
  getNotificationById: (ids: number[]) => Notification[]
) =>
  Object.assign({
    authenticated: true,
    notifications: getNotificationById(dto.notifications),
    tickets: dto.tickets,
    assigned: dto.assigned,
    info: {
      tag: dto.tag,
      rank: dto.rank,
      profileImg: dto.avatar,
    },
  });

export interface RankObject {
  // numeric representation
  numeric: number;
  name: string;
  // Background-color of the badge that appears in the popper
  badgeColor: string;
  // Username h1 text-color
  nameColor: string;
}

// note: used to have colored names; decided that color-less names look better.
// the old names are written in comments beside the current names for easy
// experimentation
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
    nameColor: "white", // white
  },
  {
    numeric: 2,
    name: "Developer",
    badgeColor: "lightblue",
    nameColor: "white", // brightblue
  },
  {
    numeric: 3,
    name: "Manager",
    badgeColor: "lightgreen",
    nameColor: "white", //brightgreen
  },
  {
    numeric: 4,
    name: "Admin",
    badgeColor: "darkred",
    nameColor: "white", // darkred
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
