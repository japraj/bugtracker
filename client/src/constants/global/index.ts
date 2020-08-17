import { UserInfo } from "../user";

export interface SelectOption {
  value: string;
  label: string;
}

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
