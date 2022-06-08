import React/*, { useEffect, useRef }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBet, getProject } from '../flux/action/index';

import { mostRecentComparator } from '../util/bet';
import { buildCell, buildRow, buildTable } from '../util/html';

import BetNew from './BetNew';

import { getLog } from '../util/log';

const log = getLog('BetList.');

function BetList(props) {

	const dispatch = useDispatch();

	const projectId = useSelector(state => ((state || {}).reducer || {}).projectId);
	const projectName = useSelector(state => ((state || {}).reducer || {}).projectName);
	const betList = useSelector(state => (((state || {}).reducer || {}).data)) || [];
	const lastBet = (betList || []).sort(mostRecentComparator)[0] || {}
	const showNewBet = ((betList || []).length === 0) || ((lastBet || {}).actual_result);

	log('BetList', { projectId, projectName, betList, lastBet });

	const betNewList = [];
	if (showNewBet) {
		betNewList.push(<BetNew key={-1} />);
	}

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>{`Project ${projectName}`}</h1>)),
			buildRow(
				'header',
				buildCell('date_time', 'When'),
				buildCell('host', 'host'),
				buildCell('guest', 'guest'),
				buildCell('odd', 'odd'),
				buildCell('bet', 'bet'),
				buildCell('expected_result', 'expected_result'),
				buildCell('actual_result', 'actual_result'),
				buildCell('bet_total', 'bet_total'),
				buildCell('prize_total', 'prize_total'),
			)
		].concat(betNewList.concat(betList).map((project, index) => <BetNew
			key={index}
		/>)).concat(
			[
				buildRow(
					'refresh',
					buildCell('refresh', <button
						onClick={() => dispatch(getBet(projectId, projectName))}
						type='submit'
					>Refresh</button>, { colSpan: 9 })
				),
				buildRow(
					'back',
					buildCell('back', <button
						onClick={() => dispatch(getProject())}
						type='submit'
					>Back</button>, { colSpan: 9 })
				)
			]
		)
	);
}

export default BetList;
