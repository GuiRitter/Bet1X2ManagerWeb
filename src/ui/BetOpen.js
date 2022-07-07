import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { buildCell, buildRow } from '../util/html';

import { closeBet, setResult } from '../flux/action/index';

import { decimal } from '../util/math';

import ResultSelect from './ResultSelect';

import { getLog } from '../util/log';

const log = getLog('BetOpen.');

let actualResultField = null;

function componentDidMount(props, dispatch, actualResult) {
	if (actualResultField && actualResult && (actualResultField.value !== actualResult)) {
		actualResultField.value = actualResult
	}
}

function BetOpen(props) {

	const actualResult = useSelector(state => ((state || {}).reducer || {}).actualResult);

	const willClose = props.lastBet.expected_result === actualResult;
	const expectedPrize = decimal(props.lastBet.prize);
	const prize = willClose ? expectedPrize : 0;
	const prizeTotal = decimal(props.lastBet.prize_total).plus(decimal(prize));
	const balanceTotal = prizeTotal.minus(decimal(props.lastBet.bet_total));
	const balance = decimal(prize).minus(decimal(props.lastBet.bet_sum));
	const isRecovery = props.lastExpectedResult && props.lastActualResult && (props.lastExpectedResult !== props.lastActualResult);

	const color =
		(!willClose) ? 'color_loss' :
		isRecovery ? 'color_recovery' :
		'color_gain';

	log('BetOpen', {
		actualResult,
		willClose,
		expectedPrize,
		prize,
		prizeTotal,
		balanceTotal,
		balance,
		lastExpectedResult: props.lastExpectedResult,
		lastActualResult: props.lastActualResult,
		color
	});

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, actualResult);
		}
	});

	return <>{buildRow(
		`bet_open_data_row`,
		buildCell(`date_time`, props.lastBet.date_time),
		buildCell(`home`, props.lastBet.home),
		buildCell(`away`, props.lastBet.away),
		buildCell(`expected_result`, props.lastBet.expected_result, { className: 'text_align_center' }),
		buildCell(`odd`, props.lastBet.odd, { className: 'text_align_right' }),
		buildCell(`bet`, props.lastBet.bet, { className: 'text_align_right' }),
		buildCell(`bet_sum`, props.lastBet.bet_sum, { className: 'text_align_right' }),

		buildCell(
			`actual_result`,
			<ResultSelect
				className={`text_align_center ${color}`}
				expectedResult={props.lastBet.expected_result}
				hasEmptyOption
				isRecovery={isRecovery}
				onInput={() => dispatch(setResult(actualResultField.value))}
				setRef={(ref) => actualResultField = ref}
			/>,
			{ className: 'text_align_center' }
		),

		buildCell(`prize`, expectedPrize.toFixed(2), { className: 'text_align_right' }),
		buildCell(`balance`, balance.toFixed(2), { className: 'text_align_right' }),
		buildCell(`bet_total`, props.lastBet.bet_total, { className: 'text_align_right' }),
		buildCell(`prize_total`, prizeTotal.toFixed(2), { className: 'text_align_right' }),
		buildCell(`balance_total`, balanceTotal.toFixed(2), { className: 'text_align_right' })
	)}{buildRow(
		`bet_open_action_row`,
		buildCell('bet_action', <button
			onClick={() => dispatch(closeBet())}
			type='submit'
		>Set result</button>, { className: 'text_align_right', colSpan: 13 })
	)}</>;
}

export default BetOpen;
