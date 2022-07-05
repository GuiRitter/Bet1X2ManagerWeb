import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { buildCell, buildRow } from '../util/html';
import { decimal } from '../util/math';
import { filledOrZero } from '../util/system';

import { placeBet, setDateTime, setHome, setAway, setExpectedResult, setBet, setOdd } from '../flux/action/index';

import ResultSelect from './ResultSelect';

import { getLog } from '../util/log';

const log = getLog('BetNew.');

let dateTimeField = null;
let homeField = null;
let awayField = null;
let oddField = null;
let betField = null;
let expectedResultField = null;

function componentDidMount(props, dispatch, dateTime, home, away, expectedResult, bet, odd) {
	if (dateTimeField && (dateTimeField.value !== dateTime)) {
		dateTimeField.value = dateTime
	}
	if (homeField && (homeField.value !== home)) {
		homeField.value = home
	}
	if (awayField && (awayField.value !== away)) {
		awayField.value = away
	}
	if (expectedResultField && expectedResult && (expectedResultField.value !== expectedResult)) {
		expectedResultField.value = expectedResult
	}
	if (betField && filledOrZero(bet) && (!(decimal(betField.value || 0).equals(decimal(bet))))) {
		betField.value = bet
	}
	if (oddField && filledOrZero(odd) && (!(decimal(oddField.value || 0).equals(decimal(odd))))) {
		oddField.value = odd
	}
}

function BetNew(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	const dateTime = useSelector(state => ((state || {}).reducer || {}).dateTime);
	const home = useSelector(state => ((state || {}).reducer || {}).home);
	const away = useSelector(state => ((state || {}).reducer || {}).away);
	const expectedResult = useSelector(state => ((state || {}).reducer || {}).expectedResult);
	const bet = useSelector(state => ((state || {}).reducer || {}).bet) || 0;
	const odd = useSelector(state => ((state || {}).reducer || {}).odd) || 0;

	const isClosed = props.lastBet.expected_result === props.lastBet.actual_result;
	const lastBetSum = isClosed ? 0 : ((props || {}).lastBet || {}).bet_sum || 0;
	const betSum = decimal(bet).plus(decimal(lastBetSum));
	const expectedPrize = decimal(odd).times(decimal(bet));
	const expectedBalance = expectedPrize.minus(decimal(betSum));
	const betTotal = decimal(props.lastBet.bet_total || 0).plus(decimal(bet));
	const prizeTotal = decimal(props.lastBet.prize_total || 0).plus(decimal(expectedPrize));
	const balanceTotal = prizeTotal.minus(decimal(betTotal));

	log('BetNew', { props, bet, odd });

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, dateTime, home, away, expectedResult, bet, odd);
		}
	});

	return <>{buildRow(
		`bet_new_data_row`,
		buildCell(`date_time`, <input onInput={() => dispatch(setDateTime(dateTimeField.value))} ref={ref => { if (ref) { dateTimeField = ref; } }} />),
		buildCell(`home`, <input onInput={() => dispatch(setHome(homeField.value))} ref={ref => { if (ref) { homeField = ref; } }} />),
		buildCell(`away`, <input onInput={() => dispatch(setAway(awayField.value))} ref={ref => { if (ref) { awayField = ref; } }} />),

		buildCell(
			`expected_result`,
			<ResultSelect
				isDefault={true}
				onInput={() => dispatch(setExpectedResult(expectedResultField.value))}
				setRef={(ref) => expectedResultField = ref}
			/>,
			{ className: 'text_align_center' }
		),

		buildCell(`odd`, <input className='text_align_right input_number' onInput={() => dispatch(setOdd(oddField.value))} ref={ref => { if (ref) { oddField = ref; } }} />),
		buildCell(`bet`, <input className='text_align_right input_number' onInput={() => dispatch(setBet(betField.value))} ref={ref => { if (ref) { betField = ref; } }} />),
		buildCell(`bet_sum`, betSum.toFixed(2), { className: 'text_align_right' }),
		buildCell(`actual_result`, '', { className: 'text_align_center' }),
		buildCell(`prize`, expectedPrize.toFixed(2), { className: 'text_align_right' }),
		buildCell(`balance`, expectedBalance.toFixed(2), { className: 'text_align_right' }),
		buildCell(`bet_total`, betTotal.toFixed(2), { className: 'text_align_right' }),
		buildCell(`prize_total`, prizeTotal.toFixed(2), { className: 'text_align_right' }),
		buildCell(`balance_total`, balanceTotal.toFixed(2), { className: 'text_align_right' })
	)}{buildRow(
		`bet_new_action_row`,
		buildCell('bet_action', <button
			onClick={() => dispatch(placeBet())}
			type='submit'
		>Place bet</button>, { className: 'text_align_right', colSpan: 13 })
	)}</>;
}

export default BetNew;
