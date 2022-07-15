import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeBet, setResult } from '../flux/action/index';

import { isGain } from '../util/bet';
import { buildCell, buildRow } from '../util/html';
import { getLog } from '../util/log';
import { decimal } from '../util/math';

import ResultSelect from './ResultSelect';

const log = getLog('BetOpen.');

let actualResultField = null;

function componentDidMount(props, dispatch, actualResult) {
	if (actualResultField && actualResult && (actualResultField.value !== actualResult)) {
		actualResultField.value = actualResult
	}
}

function BetOpen(props) {

	const actualResult = useSelector(state => ((state || {}).reducer || {}).actualResult);

	const isReturn = (actualResult || '').includes('R');
	const isRecovery = props.lastExpectedResult && props.lastActualResult && (!isGain(props.lastExpectedResult, props.lastActualResult));
	const willClose = isReturn ? (!isRecovery) : isGain(props.openBet.expected_result, actualResult);
	const expectedPrize = decimal(props.openBet.prize);
	const prize = (willClose && (!isReturn)) ? expectedPrize : 0;
	const prizeTotal = decimal(props.openBet.prize_total).plus(decimal(prize));
	const betSum = decimal(props.openBet.bet_sum).minus(isReturn ? decimal(props.openBet.bet) : decimal('0'));
	const betTotal = decimal(props.openBet.bet_total).minus(isReturn ? decimal(props.openBet.bet) : decimal('0'));
	const balanceTotal = prizeTotal.minus(betTotal);
	const balance = decimal(prize).minus(betSum);

	const color =
		isReturn ? '' :
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
		buildCell(`date_time`, props.openBet.date_time),
		buildCell(`home`, props.openBet.home),
		buildCell(`away`, props.openBet.away),
		buildCell(`expected_result`, props.openBet.expected_result, { className: 'text_align_center' }),
		buildCell(`odd`, props.openBet.odd, { className: 'text_align_right' }),
		buildCell(`bet`, props.openBet.bet, { className: 'text_align_right' }),
		buildCell(`bet_sum`, betSum.toFixed(2), { className: 'text_align_right' }),

		buildCell(
			`actual_result`,
			<ResultSelect
				className={`text_align_center ${color}`}
				expectedResult={props.openBet.expected_result}
				hasEmptyOption
				hasReturn
				isRecovery={isRecovery}
				onInput={() => dispatch(setResult(actualResultField.value))}
				setRef={(ref) => actualResultField = ref}
			/>,
			{ className: 'text_align_center' }
		),

		buildCell(`prize`, expectedPrize.toFixed(2), { className: 'text_align_right' }),
		buildCell(`balance`, balance.toFixed(2), { className: 'text_align_right' }),
		buildCell(`bet_total`, betTotal.toFixed(2), { className: 'text_align_right' }),
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
