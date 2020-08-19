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

export const getNotificationFromDTO = (dto: any): Notification =>
  Object.assign({
    id: dto.id,
    author: dto.author,
    date: dto.creationDate,
    message: dto.type,
    ticketId: dto.ticketID,
    new: dto.read,
  });
