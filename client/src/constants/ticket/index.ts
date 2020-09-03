// This file is a collection of constants used throughout the app
export interface Ticket {
  id: string;
  typeLabel: number;
  title: string;
  author: string;
  creationDate: string;
  updateDate: string;
  description: string;
  reproducibility: number;
  severity: number;
  status: number;
  assignees: string[];
  imageLinks: string[];
  activity: number[];
}

export interface EditedTicket {
  title: string;
  description: string;
  status: number;
  severity: number;
  reproducibility: number;
  typeLabel: number;
  imageLinks: string[];
  assignees: string[];
}

export interface NewTicket {
  title: string;
  description: string;
  severity: number;
  reproducibility: number;
  typeLabel: number;
  imageLinks: string[];
}

export interface CollapsedTicket {
  id: string;
  typeLabel: number;
  title: string;
  author: string;
  updateDate: string;
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

export enum TypeLabel {
  "Bug",
  "Feature Request",
  "Suggestion",
}

// The below DTO Map functions do not do anything other than convert the given
// variable to an object of a specific type. However, it is important that we
// declare these map functions so that if we ever need to update a model,
// we only need to update our mappings in one place.
export const getTicketFromDTO = (dto: any): Ticket => Object.assign({}, dto);

export const getCollapsedTicketFromDTO = (dto: any): CollapsedTicket =>
  Object.assign({}, dto);
