import { Ticket } from "../constants/ticket";
import { LoadUserPayload, Rank } from "../constants/user";
import { Notification } from "../constants/notification";
import { Normalized } from "../flux/slices/contextSlice";
import {
  User,
  randomInt,
  randomBool,
  getRandom,
  titles,
  comments,
} from "./predefined";

const localUser = "Spongebob";
export const localUserInfo = User.find((u) => u.tag === localUser)!;

// an implementation of the Fisher-Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffle = <T>(set: T[]): T[] => {
  var elt: T;
  var j: number;

  for (var i = set.length - 1; i > 0; i--) {
    j = randomInt(i);
    elt = set[j];
    set[j] = set[i];
    set[i] = elt;
  }

  return set;
};

// produces a shuffled set of all ints in [start, start + length]
const genIntSet = (start: number, length: number): number[] => {
  var set: number[] = [];
  for (var i = start; i <= start + length; i++) set.push(i);
  return shuffle(set);
};

// produces a random date within past n days
const randomDate = (n: number): Date => {
  return new Date(
    new Date().getTime() -
      (randomInt(n) * 24 * 3600 * 1000 +
        randomInt(24) * 3600 +
        randomInt(3600) * 1000 +
        randomInt(1000))
  );
};

// produce a set containing anywhere between 0 to max links to random imgs
// const randomImageSet = (max: number): string[] => {
//   var set: string[] = [];
//   for (var i = 0; i < randomInt(max); i++)
//     set.push(
//       `placeimg.com/${randomInt(500) + 500}/${randomInt(350) + 350}/any`
//     );
//   return set;
// };

export interface DataSet {
  users: LoadUserPayload[];
  tickets: Ticket[];
  activity: Notification[];
  notifications: Notification[];
  assigned: number[];
}

export const generateDataSet = (): DataSet => {
  var users: { [key: string]: LoadUserPayload } = {};
  User.map((u) => Object.assign({ activity: [], tickets: [] }, u)).forEach(
    (u) => {
      users[u.tag] = u;
    }
  );

  var tickets: Ticket[] = [];
  var activity: Notification[] = [];
  // tickets that local user is assigned to
  var assigned: number[] = [];
  // activity on tickets that the local user has created or is assigned to
  var notifications: number[] = [];

  var activitySubset: number[] = [];
  // assignable is set of users with rank developer or higher
  var assignable = User.filter((u) => u.rank > Rank.User).map((u) => u.tag);
  // this is a shuffled set containing all integers in the range [50, 250]
  var activityIds: number[] = genIntSet(50, 200);
  // the index that we are currently on, corresponds to activityIds
  var activityIndex: number = 0;
  // used to select titles and comments from the titles and comments arrays, sequentially
  var titleIndex: number = 0;
  var commentIndex = 0;
  // intermediate vars
  var jump: number;
  var creationDate: Date;
  var updateDate: Date;
  var ticket: Ticket;
  var isAssigned: boolean;
  var devs: string[];

  // predefined welcome ticket
  tickets.push({
    id: 1,
    typeLabel: 1,
    title: "CLICK HERE TO START!!!",
    author: localUser,
    creationDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    description:
      "Hello and welcome! You are viewing a special version of my webapp that gives you administrator privileges and a randomly generated set of users, posts, and comments. Any changes you make are deleted as soon as you refresh your browser. If you are interested in a full description of my site or its source code, see the repo at github.com/japraj/bugtracker. You can start by adding a comment using the textbox below, or editing the ticket with the icon on the bottom right. Tip: try hovering over user avatars!",
    reproducibility: randomInt(2),
    severity: randomInt(2),
    status: randomInt(2),
    assignees: [],
    imageLinks: [],
    activity: [],
  });
  users[localUser].tickets.push(1);

  for (var i = 6; i <= 50; i++) {
    // we have ~200 activities & ~50 tickets so we want an average of 4 notifications per
    // ticket - that is why 7 is used below (mean of the distribution ~ 4)
    if (activityIndex < 200) {
      // select a random sequence of activity ids, starting from activityIndex,
      // and add it to the ticket
      jump = randomInt(7);
      if (jump + activityIndex >= 200) jump = 200 - activityIndex - 1;
      activitySubset = activityIds.slice(
        activityIndex,
        jump + activityIndex + 1
      );
      activityIndex += jump + 1;
    }

    creationDate = randomDate(14);
    updateDate = randomDate(14);
    // if the updateDate is before the creation date, or there are no activities
    // (which implies that there were no updates), use default val for updateDate
    if (updateDate < creationDate || activitySubset.length === 0)
      updateDate = creationDate;

    // random subset of the developers+
    do {
      devs = shuffle(assignable).slice(0, randomInt(assignable.length / 2));
    } while (
      devs.includes(localUser) &&
      (randomBool() || randomBool())
      // randomization to decrease probability of localUser being assigned
    );

    // randomize all fields of the ticket; most of the magic constants below are just random values.
    // some fields like typeLabel (and all other ticket flags) must not be changed though.
    // List of properties whose vals may be tweaked (as in - the params passed to the functions can be changed):
    // title, description, assignees, imageLinks
    ticket = {
      id: i,
      typeLabel: randomInt(2),
      title: titles[titleIndex],
      // decrease probability of localUser being author
      author:
        getRandom(User).tag === localUser && randomBool()
          ? localUser
          : getRandom(User.filter((u) => u.tag !== localUser)).tag,
      creationDate: creationDate.toISOString(),
      updateDate: updateDate.toISOString(),
      description: comments[commentIndex],
      reproducibility: randomInt(2),
      severity: randomInt(2),
      status: randomInt(2),
      assignees: devs,
      imageLinks: [],
      activity: activitySubset,
    };

    titleIndex = titleIndex + 1 < titles.length ? titleIndex + 1 : 0;
    commentIndex = commentIndex + 1 < comments.length ? commentIndex + 1 : 0;

    isAssigned = ticket.assignees.indexOf(localUser) !== -1;

    if (isAssigned) assigned.push(ticket.id);
    if (isAssigned || ticket.author === localUser)
      notifications = notifications.concat(ticket.activity);

    // generate a notification for the creation of this ticket
    activity.push({
      id: i,
      ticketId: i.toString(),
      date: ticket.creationDate,
      author: ticket.author,
      message: 0,
      value: "",
      new: false,
    });

    // add the above ticket & notification to the author obj
    users[ticket.author].activity.push(i);
    users[ticket.author].tickets.push(i);

    tickets.push(ticket);
  }

  // for every notification id that is used by a ticket, generate a notification
  // and add that notification to the user
  var message;
  tickets.forEach((ticket: Ticket) => {
    ticket.activity.forEach((id) => {
      message = randomBool() && randomBool() ? 2 : randomInt(7) + 3;
      var notification = {
        id: id,
        ticketId: ticket.id.toString(),
        date: ticket.updateDate,
        author: getRandom(User).tag,
        message: message,
        value: message === 2 ? comments[commentIndex] : "",
        new: randomBool(),
      };

      activity.push(notification);
      users[notification.author].activity.push(id);

      if (message === 2)
        commentIndex =
          commentIndex + 1 < comments.length ? commentIndex + 1 : 0;
    });
  });

  return {
    tickets: tickets,
    activity: activity,
    users: Object.values(users),
    notifications: notifications.map(
      (id) => activity.find((a) => a.id === id)!
    ),
    assigned: assigned,
  };
};

export const arrayToNormalized = <T>(set: T[], key: keyof T): Normalized<T> => {
  return {
    byKey: set.reduce((acc, elt) => {
      acc[elt[key]] = elt;
      return acc;
    }, Object.assign({})),
    allKeys: set.map((element) => `${element[key]}`),
  };
};
