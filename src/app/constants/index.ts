import { createMuiTheme } from "@material-ui/core/styles";
// This file is a collection of constants used throughout the app

export const collapsedWidth: number = 53;
export const extendedWidth: number = 175;
// Navigation Widths

export interface UserInfo {
  profileImg: string;
  tag: string;
  rank: number;
}
// Global User Object, used for UserLinks/author of an issue.
//  Note: tags are unique!

export interface User {
  authenticated: boolean;
  id: number;
  notifications: Notification[];
  info: UserInfo;
}
// Local User (the user that is using the client)

export enum NumericRank {
  Blacklisted,
  User,
  Developer,
  Manager,
  Admin,
}

export enum UserRank {
  "Blacklisted",
  "User",
  "Developer",
  "Manager",
  "Admin",
}

export enum UserRankColors {
  "null",
  "grey",
  "lightblue",
  "lightgreen",
  "darkred",
}
// Above is the background-color of the badge that appears in the popper

export enum UserNameColors {
  "lightgrey",
  "white",
  "brightblue",
  "brightgreen",
  "darkred",
}
// This is the color of the username.

export interface Notification {
  date: string;
  author: UserInfo;
  message: string;
  ticketId: string;
  new: boolean;
}
// A notification is just a record of a change
// that was applied to an issue.

export enum TypeLabel {
  "Bug",
  "Feature Request",
  "Suggestion",
}

export interface CollapsedTicket {
  id: string;
  typeLabel: number;
  title: string;
  author: UserInfo;
  updateDate: number;
  severity: number;
  status: number;
  comments: number;
}
// Collapsed tickets are found on the homepage;
// they store only essential information about a ticket

export enum Status {
  "unresolved",
  "work-in-progress",
  "resolved",
}

export enum Severity {
  "trivial",
  "minor",
  "major",
}

export enum Reproducibility {
  "Always",
  "Common",
  "Uncommon",
  "Rare",
  "Never",
}

export interface Ticket {
  id: string;
  typeLabel: number;
  title: string;
  author: UserInfo;
  creationDate: number;
  updateDate: number;
  description: string;
  reproducibility: number;
  severity: number;
  status: number;
  assignees: UserInfo[];
  imageLinks: string[];
  activity: Notification[];
}

export interface EditedTicket {
  title: string;
  description: string;
  status: number;
  severity: number;
  reproducibility: number;
  typeLabel: number;
  imageLinks: string[];
  assignees: UserInfo[];
}

export interface NewTicket {
  title: string;
  description: string;
  status: number;
  severity: number;
  reproducibility: number;
  typeLabel: number;
  imageLinks: string[];
}

export interface Tab {
  iconName: string;
  title: string;
  requiredRank: number;
}

export enum Sort {
  NEW = "NEW",
  OLD = "OLD",
  SEVERITY = "SEVERITY",
  STATUS = "STATUS",
}

export interface SelectOption {
  value: string;
  label: string;
}

export const sortSelectOptions: SelectOption[] = [
  { value: Sort.NEW, label: "Sort by Newest" },
  { value: Sort.OLD, label: "Sort by Oldest" },
  { value: Sort.SEVERITY, label: "Sort by Severity" },
  { value: Sort.STATUS, label: "Sort by Status" },
];

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#209e91",
    },
    secondary: {
      main: "#209e91",
    },
  },
});

export const getUsersFromTags = (
  users: UserInfo[],
  tags: string[]
): UserInfo[] => users.filter((user) => tags.includes(user.tag));

export const getTagsFromUsers = (users: UserInfo[]): string[] =>
  users.map((user) => user.tag);

export const keyToIndex = (givenKey: string, givenEnum: any): number => {
  for (let i = 0; i < Object.keys(givenEnum).length; i++)
    if (givenEnum[i] === givenKey) return i;
  return -1;
};

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.substring(1);

export const mapEnumToSelectOption = (
  prefix: string,
  givenEnum: any
): SelectOption[] => {
  let output: SelectOption[] = [];
  Object.keys(givenEnum)
    .filter((key) => !isNaN(Number(givenEnum[key])))
    .map((key) =>
      output.push({ label: prefix + ": " + capitalize(key), value: key })
    );
  return output;
};
