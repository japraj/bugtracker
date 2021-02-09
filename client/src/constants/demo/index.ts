// find largest id in set and add 1 to it to get nextId
export const getNextId = (keys: string[]): number =>
  (keys
    .map((v: string) => (v as unknown) as number)
    .reduce((acc, current) => (current > acc ? current : acc), -1) as number) +
  1;
