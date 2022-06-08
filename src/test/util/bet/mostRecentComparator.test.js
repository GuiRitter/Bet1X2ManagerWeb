import { render } from '@testing-library/react';
import { mostRecentComparator } from '../../../util/bet';

test('works: [2022-06-07, 2022-06-06, 2022-06-05]', () => {
	const input = [{
		date_time: '2022-06-05T16:00:00-03:00'
	}, {
		date_time: '2022-06-06T15:45:00-03:00'
	}, {
		date_time: '2022-06-07T10:30:00-03:00'
	}];
	expect(input.sort(mostRecentComparator)).toStrictEqual([{
		date_time: '2022-06-07T10:30:00-03:00'
	}, {
		date_time: '2022-06-06T15:45:00-03:00'
	}, {
		date_time: '2022-06-05T16:00:00-03:00'
	}]);
});
