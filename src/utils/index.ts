export const timePredicator = (date: Date | Date[] | undefined): Date | null =>
  date instanceof Date ? date : null;


