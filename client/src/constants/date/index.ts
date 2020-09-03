export const getDateFromISO = (dateStr: string): Date => {
  // const d: number[] = dateStr.split(/\D/).map((s) => {
  //   try {
  //     return Number(s);
  //   } catch {
  //     return 0;
  //   }
  // });
  // var date: Date = new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
  // date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  // return date;

  // Main issue with the commented method is that i'm unsure whether subtracting the timezone offset works 100% of the time
  // (or whether we need to add it in some cases)
  return new Date(
    dateStr.charAt(dateStr.length - 1) === "Z" ? dateStr : dateStr + "Z"
  );
};
