export const mostRecentComparator = (betA, betB) => (betA.date_time > betB.date_time) ? -1 : (betA.date_time < betB.date_time) ? 1 : 0;
