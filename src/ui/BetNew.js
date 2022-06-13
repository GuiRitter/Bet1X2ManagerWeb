import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { buildCell, buildRow } from '../util/html';
import { decimal } from '../util/math';
import { filledOrZero } from '../util/system';

import { setBet, setOdd } from '../flux/action/index';

import { getLog } from '../util/log';

const log = getLog('BetNew.');

let dateTimeField = null;
let homeField = null;
let awayField = null;
let oddField = null;
let betField = null;
let expectedResultField = null;
let expectedPrizeField = null;
let betSumField = null;

function componentDidMount(props, dispatch, bet, odd) {
	if (betField && filledOrZero(bet) && (!(decimal(betField.value || 0).equals(bet)))) {
		betField.value = bet
	}
	if (oddField && filledOrZero(odd) && (!(decimal(oddField.value || 0).equals(odd)))) {
		oddField.value = odd
	}
}

function BetNew(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	const bet = useSelector(state => ((state || {}).reducer || {}).bet) || 0;
	const odd = useSelector(state => ((state || {}).reducer || {}).odd) || 0;

	const isClosed = props.lastBet.expected_result === props.lastBet.actual_result;
	const lastBetSum = isClosed ? 0 : ((props || {}).lastBet || {}).bet_sum || 0;
	const betSum = decimal(bet).plus(lastBetSum);
	const expectedPrize = decimal(odd).times(bet);
	const expectedBalance = expectedPrize.minus(betSum);
	const betTotal = decimal(props.lastBet.bet_total || 0).plus(bet);
	const prizeTotal = decimal(props.lastBet.prize_total || 0).plus(expectedPrize);
	const balanceTotal = prizeTotal.minus(betTotal);

	log('BetNew', { props, bet, odd });

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, bet, odd);
		}
	});

	return <>{
		buildRow(
			`bet_row_${props.index}`,
			buildCell(`date_time_${props.index}`, <input ref={ref => { if (ref) { dateTimeField = ref; } }} />),
			buildCell(`home_${props.index}`, <input ref={ref => { if (ref) { homeField = ref; } }} />),
			buildCell(`away_${props.index}`, <input ref={ref => { if (ref) { awayField = ref; } }} />),
			buildCell(`expected_result_${props.index}`, <select ref={ref => { if (ref) { expectedResultField = ref; } }}><option>1</option><option>X</option><option>2</option></select>, { className: 'text_align_center' }),
			buildCell(`odd_${props.index}`, <input className='text_align_right' onInput={() => dispatch(setOdd(oddField.value))} ref={ref => { if (ref) { oddField = ref; } }} />),
			buildCell(`bet_${props.index}`, <input className='text_align_right' onInput={() => dispatch(setBet(betField.value))} ref={ref => { if (ref) { betField = ref; } }} />),
			buildCell(`bet_sum_${props.index}`, betSum.toFixed(2), { className: 'text_align_right', ref: ref => { if (ref) betSumField = ref } }),
			buildCell(`actual_result_${props.index}`, '', { className: 'text_align_center' }),
			buildCell(`prize_${props.index}`, expectedPrize.toFixed(2), { className: 'text_align_center' }),
			buildCell(`balance_${props.index}`, expectedBalance.toFixed(2), { className: 'text_align_center' }),
			buildCell(`bet_total_${props.index}`, betTotal.toFixed(2), { className: 'text_align_right' }),
			buildCell(`prize_total_${props.index}`, prizeTotal.toFixed(2), { className: 'text_align_right' }),
			buildCell(`balance_total_${props.index}`, balanceTotal.toFixed(2), { className: 'text_align_right' })
		)}{buildRow(
			`bet_action_header_row_${props.index}`,
			buildCell('bet_total', <button
				onClick={() => alert('TO DO')}
				type='submit'
			>Place bet</button>, { className: 'text_align_right', colSpan: 13 })
		)}</>
}

export default BetNew;
