import React/*, { useEffect, useRef }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBet, getProject } from '../flux/action/index';

import { mostRecentComparator } from '../util/bet';
import { buildCell, buildRow, buildTable } from '../util/html';

import BetClosed from './BetClosed';
import BetNew from './BetNew';
import BetOpen from './BetOpen';

import { getLog } from '../util/log';

const log = getLog('BetList.');

function BetList(props) {

	const dispatch = useDispatch();

	const projectId = useSelector(state => ((state || {}).reducer || {}).projectId);
	const projectName = useSelector(state => ((state || {}).reducer || {}).projectName);
	const betList = (useSelector(state => (((state || {}).reducer || {}).data)) || []).sort(mostRecentComparator) || [];
	const lastBet = betList[0] || {};
	const penultimateBet = betList[1] || {};
	const showNewBet = (betList.length === 0) || ((lastBet || {}).actual_result);

	log('BetList', { projectId, projectName, betList, lastBet, showNewBet });

	const betActionList = [];
	if (showNewBet) {
		betActionList.push(<BetNew key={-1} index={-1} lastBet={lastBet} />);
	} else {
		betActionList.push(<BetOpen
			key={-1}
			index={-1}
			lastBet={lastBet}
			lastExpectedResult={penultimateBet.expected_result}
			lastActualResult={penultimateBet.actual_result}
		/>);
	}

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>{`Project ${projectName}`}</h1>, { colSpan: 11 })),
			buildRow(
				'header',
				buildCell('date_time', 'When'),
				buildCell('home', 'Home'),
				buildCell('away', 'Away'),
				buildCell('expected_result', 'Expected result', { className: 'text_align_center' }),
				buildCell('odd', 'Odds', { className: 'text_align_right' }),
				buildCell('bet', 'Bet', { className: 'text_align_right' }),
				buildCell('bet_sum', 'Bet sum', { className: 'text_align_right' }),
				buildCell('actual_result', 'Actual Result', { className: 'text_align_center' }),
				buildCell('prize', 'Prize', { className: 'text_align_right' }),
				buildCell('balance', 'Balance', { className: 'text_align_right' }),
				buildCell('bet_total', 'Bet total', { className: 'text_align_right' }),
				buildCell('prize_total', 'Prize total', { className: 'text_align_right' }),
				buildCell('balance_total', 'Balance total', { className: 'text_align_right' })
			)
		].concat(betActionList).concat(betList.filter(bet => bet.actual_result).map((bet, index, array) => {
			let lastExpectedResult = null;
			let lastActualResult = null;
			if (array[index + 1]) {
				lastExpectedResult = array[index + 1].expected_result;
				lastActualResult = array[index + 1].actual_result;
			}
			return <BetClosed
				key={index}
				bet={bet}
				lastExpectedResult={lastExpectedResult}
				lastActualResult={lastActualResult}
			/>;
		})).concat(
			[
				buildRow(
					'refresh',
					buildCell('refresh', <button
						onClick={() => dispatch(getBet(projectId, projectName))}
						type='submit'
					>Refresh</button>, { colSpan: 13 })
				),
				buildRow(
					'back',
					buildCell('back', <button
						onClick={() => dispatch(getProject())}
						type='submit'
					>Back</button>, { colSpan: 13 })
				)
			]
		)
	);
}

export default BetList;
