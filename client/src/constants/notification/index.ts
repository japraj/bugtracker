export interface Notification {
  id: number;
  date: string;
  author: string;
  message: number;
  value: string;
  ticketId: string;
  new: boolean;
}
// A notification is just a record of a change
// that was applied to an issue.

export const getNotificationFromDTO = (dto: any): Notification =>
  Object.assign({
    id: dto.id,
    author: dto.author,
    date: dto.creationDate,
    message: dto.type,
    value: dto.new,
    ticketId: dto.ticketID,
    new: dto.read,
  });

export enum Variant {
  GLOBAL,
  MODAL,
}

export const generateGlobalMessage = (notification: Notification): string => {
  switch (notification.message) {
    case 0:
      return `created issue #${notification.ticketId}`;
    case 1:
      return `deleted an issue`;
    case 2:
      return `comented on issue #${notification.ticketId}`;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return `updated issue #${notification.ticketId}`;
    case 11:
      return `updated your rank to ${notification.new}`;
    case 12:
      return `updated your Avatar to ${notification.new}`;
    default:
      return `did something; #${notification.id}`;
  }
};

export const generateModalMessage = (notification: Notification): string => {
  switch (notification.message) {
    case 2:
      return notification.value;
    case 3:
      return `updated the title`;
    case 4:
      return `updated the description`;
    case 5:
      return `updated this issue's status`;
    case 6:
      return `updated this issue's severity`;
    case 7:
      return `updated this issue's reproducibility`;
    case 8:
      return `updated this issue's tag`;
    case 9:
      return `updated this issue's assignees`;
    case 10:
      return `updated the attached links`;
    default:
      return generateGlobalMessage(notification);
  }
};