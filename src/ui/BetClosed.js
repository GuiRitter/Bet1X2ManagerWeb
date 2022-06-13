import { buildCell, buildRow } from '../util/html';

import { decimal } from '../util/math';

function BetClosed(props) {

	const balanceTotal = decimal(props.bet.prize_total).minus(props.bet.bet_total);
	const prize = decimal(decimal(props.bet.odd).times(props.bet.bet).toFixed(2));
	const balance = prize.minus(props.bet.bet_sum);

	return buildRow(
		`bet_row_${props.index}`,
		buildCell(`date_time_${props.index}`, props.bet.date_time),
		buildCell(`home_${props.index}`, props.bet.home),
		buildCell(`away_${props.index}`, props.bet.away),
		buildCell(`expected_result_${props.index}`, props.bet.expected_result, { className: 'text_align_center' }),
		buildCell(`odd_${props.index}`, props.bet.odd, { className: 'text_align_right' }),
		buildCell(`bet_${props.index}`, props.bet.bet, { className: 'text_align_right' }),
		buildCell(`bet_sum_${props.index}`, props.bet.bet_sum, { className: 'text_align_right' }),
		buildCell(`actual_result_${props.index}`, props.bet.actual_result, { className: 'text_align_center' }),
		buildCell(`prize_${props.index}`, prize.toFixed(2), { className: 'text_align_center' }),
		buildCell(`balance_${props.index}`, balance.toFixed(2), { className: 'text_align_center' }),
		buildCell(`bet_total_${props.index}`, props.bet.bet_total, { className: 'text_align_right' }),
		buildCell(`prize_total_${props.index}`, props.bet.prize_total, { className: 'text_align_right' }),
		buildCell(`balance_total_${props.index}`, balanceTotal.toFixed(2), { className: 'text_align_right' })
	)
}

export default BetClosed;
