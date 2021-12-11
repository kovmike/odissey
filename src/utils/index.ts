export const timePredicator = (date: Date | Date[] | undefined): Date | null =>
  date instanceof Date ? date : null;

export const isPositiveValue = (val: any) => {
  let str = String(val).trim();
  if (!str) {
    return false;
  }
  str = str.replace(/^0+/, "") || "0";
  const n = Number(str);
  return n !== Infinity && String(n) === str && n >= 0;
};
