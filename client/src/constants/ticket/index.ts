import { Notification } from "../notification";

// This file is a collection of constants used throughout the app
export interface Ticket {
  id: string;
  typeLabel: number;
  title: string;
  author: string;
  creationDate: number;
  updateDate: number;
  description: string;
  reproducibility: number;
  severity: number;
  status: number;
  assignees: string[];
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
  assignees: string[];
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

export interface CollapsedTicket {
  id: string;
  typeLabel: number;
  title: string;
  author: string;
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

export enum TypeLabel {
  "Bug",
  "Feature Request",
  "Suggestion",
}
