import { Ticket } from "../constants/ticket";
import { LoadUserPayload, Rank } from "../constants/user";
import { Notification } from "../constants/notification";
import { AuthState } from "../flux/slices/authSlice";
import { Normalized } from "../flux/slices/contextSlice";
import {
  User,
  randomInt,
  randomString,
  randomBool,
  getRandom,
} from "./predefined";

export const demoAuthState: AuthState = {
  loaded: true,
  user: {
    authenticated: true,
    tickets: [],
    notifications: [],
    assigned: [],
    info: User.filter((u) => u.tag === "Spongebob")[0],
  },
};

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

const randomImageSet = (max: number): string[] => {
  var set: string[] = [];
  for (var i = 0; i < randomInt(max); i++)
    set.push(
      `placeimg.com/${randomInt(500) + 500}/${randomInt(350) + 350}/any`
    );
  return set;
};

export interface DataSet {
  users: LoadUserPayload[];
  tickets: Ticket[];
  notifications: Notification[];
}

export const generateDataSet = (): DataSet => {
  var userSet: LoadUserPayload[] = User.map((u) =>
    Object.assign({ activity: [], tickets: [] }, u)
  );
  var ticketSet: Ticket[] = [];
  var notificationSet: Notification[] = [];

  var notifications: number[] = [];
  var assignable = User.filter((u) => u.rank > Rank.User).map((u) => u.tag);
  var notificationIds: number[] = genIntSet(50, 200);
  var notificationIndex: number = 0;
  var jump: number;
  var creationDate: Date;
  var updateDate: Date;
  var ticket: Ticket;
  var index;

  for (var i = 6; i <= 50; i++) {
    // we have ~200 notifications & ~50 tickets so we want an average of 4 notifications per
    // ticket - that is why 7 is used below (mean of the distribution ~ 4)
    if (notificationIndex < 200) {
      jump = randomInt(7);
      if (jump + notificationIndex >= 200) jump = 200 - notificationIndex - 1;
      notifications = notificationIds.slice(
        notificationIndex,
        jump + notificationIndex + 1
      );
      notificationIndex += jump;
    }

    creationDate = randomDate(14);
    updateDate = randomDate(14);
    if (updateDate < creationDate || notifications.length === 0)
      updateDate = creationDate;

    ticket = {
      id: i,
      typeLabel: randomInt(2),
      title: randomString(randomInt(30) + 5),
      author: getRandom(User).tag,
      creationDate: creationDate.toISOString(),
      updateDate: updateDate.toISOString(),
      description: randomString(randomInt(300) + 50),
      reproducibility: randomInt(2),
      severity: randomInt(2),
      status: randomInt(2),
      assignees: shuffle(assignable).slice(0, randomInt(assignable.length / 2)), // random subset of the developers+
      imageLinks: randomImageSet(5),
      activity: notifications,
    };

    notificationSet.push({
      id: i,
      ticketId: i.toString(),
      date: ticket.creationDate,
      author: ticket.author,
      message: 0,
      value: "",
      new: false,
    });

    index = userSet.map((u) => u.tag).indexOf(ticket.author);
    userSet[index].activity.push(i);
    userSet[index].tickets.push(i);

    ticketSet.push(ticket);
  }

  ticketSet.forEach((ticket: Ticket) => {
    ticket.activity.forEach((id) => {
      notificationSet.push({
        id: id,
        ticketId: ticket.id.toString(),
        date: ticket.updateDate,
        author: ticket.author,
        message: randomBool() && randomBool() ? 2 : randomInt(7) + 3,
        value: randomString(50),
        new: randomBool(),
      });
    });
  });

  return {
    tickets: ticketSet,
    notifications: notificationSet,
    users: userSet,
  };
};

export const arrayToNormalized = <T>(set: T[], key: keyof T): Normalized<T> => {
  const c = {
    byKey: set.reduce((acc, elt) => {
      acc[elt[key]] = elt;
      return acc;
    }, Object.assign({})),
    allKeys: set.map((element) => `${element[key]}`),
  };
  console.log(c);
  return c;
};
