import { buildCell, buildRow } from '../util/html';

import { decimal } from '../util/math';

function BetClosed(props) {

	const balanceTotal = decimal(props.bet.prize_total).minus(decimal(props.bet.bet_total));
	const prize = decimal(decimal(props.bet.odd).times(decimal(props.bet.bet)).toFixed(2));
	const balance = prize.minus(decimal(props.bet.bet_sum));
	const isGain = props.bet.expected_result === props.bet.actual_result;

	return buildRow(
		`bet_row_${props.index}`,
		buildCell(`date_time`, props.bet.date_time),
		buildCell(`home`, props.bet.home),
		buildCell(`away`, props.bet.away),
		buildCell(`expected_result`, props.bet.expected_result, { className: 'text_align_center' }),
		buildCell(`odd`, props.bet.odd, { className: 'text_align_right' }),
		buildCell(`bet`, props.bet.bet, { className: 'text_align_right' }),
		buildCell(`bet_sum`, props.bet.bet_sum, { className: 'text_align_right' }),
		buildCell(`actual_result`, props.bet.actual_result, { className: `text_align_center ${isGain ? 'color_gain' : 'color_loss'}` }),
		buildCell(`prize`, prize.toFixed(2), { className: 'text_align_right' }),
		buildCell(`balance`, balance.toFixed(2), { className: 'text_align_right' }),
		buildCell(`bet_total`, props.bet.bet_total, { className: 'text_align_right' }),
		buildCell(`prize_total`, props.bet.prize_total, { className: 'text_align_right' }),
		buildCell(`balance_total`, balanceTotal.toFixed(2), { className: 'text_align_right' })
	);
}

export default BetClosed;
