import { User, Rank } from "../user";
import { getDateFromISO } from "../date";
import { CollapsedTicket } from "../ticket";
import { SelectOption } from "../global";
import { Status } from "../ticket";

export interface Tab {
  iconName: string;
  title: string;
  requiredRank: number;
  filter: (set: CollapsedTicket[]) => CollapsedTicket[];
}

export enum Sort {
  NEW = "NEW",
  OLD = "OLD",
  SEVERITY = "SEVERITY",
  STATUS = "STATUS",
}

export const sortSelectOptions: SelectOption[] = [
  { value: Sort.NEW, label: "Sort by Newest" },
  { value: Sort.OLD, label: "Sort by Oldest" },
  { value: Sort.SEVERITY, label: "Sort by Severity" },
  { value: Sort.STATUS, label: "Sort by Status" },
];

export const applySort = (
  sort: string,
  tickets: CollapsedTicket[]
): CollapsedTicket[] => {
  var dateById: { [id: number]: number } = {};
  tickets.map((t) => {
    dateById[t.id] = getDateFromISO(t.updateDate).getTime();
    return t;
  });

  // Sort by new and any further transformations will be applied on top.
  tickets = tickets.sort((t1, t2) => dateById[t2.id] - dateById[t1.id]);

  switch (sort) {
    case Sort.SEVERITY:
      return tickets.sort((t1, t2) => t2.severity - t1.severity);
    case Sort.STATUS:
      return tickets.sort((t1, t2) => t2.status - t1.status);
    case Sort.OLD:
      return tickets.sort((t1, t2) => dateById[t1.id] - dateById[t2.id]);
    case Sort.NEW:
    default:
      return tickets;
  }
};

// each Tab option has a required rank, and an associated filter;
// - All Issues does not filter anything (has no rank requirement)
// - Resolved shows only resolved tickets (has no rank requirement)
// - Ongoing shows only unresolved tickets (requires rank Developer)
// - My Issues shows only issues submitted by the local user (requires User rank)
// - Assigned shows only tickets that the local user is assigned to (req. Developer rank)
// - Internal shows only tickets that have been submitted by developers, managers, or admins
//   (req. Developer rank)
export const generateTabSet = (
  user: User,
  getRankFromUser: (tag: string) => Rank
): Tab[] => {
  return [
    {
      iconName: "new_releases",
      title: "All Issues",
      requiredRank: -1,
      filter: (set: CollapsedTicket[]) => set,
    },
    {
      iconName: "assignment_turned_in",
      title: "Resolved",
      requiredRank: -1,
      filter: (set: CollapsedTicket[]) =>
        set.filter((t) => t.status === Status.resolved),
    },
    {
      iconName: "cached",
      title: "Ongoing",
      requiredRank: Rank.Developer,
      filter: (set: CollapsedTicket[]) =>
        set.filter((t) => t.status === Status["work-in-progress"]),
    },
    {
      iconName: "confirmation_number",
      title: "My Issues",
      requiredRank: Rank.User,
      filter: (set: CollapsedTicket[]) =>
        set.filter((t) => t.author === user.info.tag),
    },
    {
      iconName: "assignment",
      title: "Assigned",
      requiredRank: Rank.Developer,
      filter: (set: CollapsedTicket[]) =>
        set.filter((t) => user.assigned.includes(t.id)),
    },
    {
      iconName: "work",
      title: "Internal",
      requiredRank: Rank.Manager,
      filter: (set: CollapsedTicket[]) =>
        set.filter((t) => getRankFromUser(t.author) > Rank.User),
    },
  ];
};
