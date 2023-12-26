/* eslint-disable @typescript-eslint/no-explicit-any */
export const DurationWeeks = (startDate: string, endDate: string): number => {
  const start: any = new Date(startDate);
  const end: any = new Date(endDate);

  const durationInMilliseconds = Math.abs(end - start);

  const durationInWeeks = Math.ceil(
    durationInMilliseconds / (1000 * 60 * 60 * 24 * 7),
  );
  return durationInWeeks;
};
