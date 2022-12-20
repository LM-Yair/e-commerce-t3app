import { random } from "utils/globals/random";

export const slugify = (text: string, separator: string) => {
  const slug = text
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
  return `${slug}-${random(1000, 10000)}`;
};
