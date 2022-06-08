import React from 'react';

import { buildCell, buildRow } from '../util/html';

import { getLog } from '../util/log';

const log = getLog('BetNew.');

function BetNew(props) {

	log('BetNew', { props });

	let dateTimeField = null;

	return buildRow(
		`bet_row_${props.key}`,
		buildCell(`date_time_${props.key}`, <input ref={ref => { if (ref) { dateTimeField = ref; } }} />),
		buildCell(`host_${props.key}`, 'host'),
		buildCell(`guest_${props.key}`, 'guest'),
		buildCell(`odd_${props.key}`, 'odd'),
		buildCell(`bet_${props.key}`, 'bet'),
		buildCell(`expected_result_${props.key}`, 'expected_result'),
		buildCell(`actual_result_${props.key}`, 'actual_result'),
		buildCell(`bet_total_${props.key}`, 'bet_total'),
		buildCell(`prize_total_${props.key}`, 'prize_total'),
	);
}

export default BetNew;
