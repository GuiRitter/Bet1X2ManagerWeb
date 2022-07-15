export const isGain = (expectedResult, actualResult) => actualResult && (expectedResult === actualResult.substring(0, 1));

export const isNotReturned = bet => (!bet.actual_result) || (!bet.actual_result.includes('R'));

export const mostRecentComparator = (betA, betB) => (betA.date_time > betB.date_time) ? -1 : (betA.date_time < betB.date_time) ? 1 : 0;
