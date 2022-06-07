import React/*, { useEffect, useRef }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBet, getProject } from '../flux/action/index';

import { buildCell, buildRow, buildTable } from '../util/html';

import { getLog } from '../util/log';

const log = getLog('BetList.');

function BetList(props) {

	const dispatch = useDispatch();

	const projectId = useSelector(state => ((state || {}).reducer || {}).projectId);
	const projectName = useSelector(state => ((state || {}).reducer || {}).projectName);
	const betList = useSelector(state => (((state || {}).reducer || {}).data)) || [];

	log('BetList', { betList });

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>{`Project ${projectName}`}</h1>)),
			buildRow(
				'header',
				buildCell('name', 'Name'),
				buildCell('manage', '')
			)
		].concat(betList.map((project, index) => buildRow(
			`project_${index}`,
			buildCell(`name_${index}`, project.name),
			buildCell(`manage_${index}`, <button
				onClick={() => alert('TO DO')}
				type='submit'
			>Manage</button>)
		))).concat(
			[
				buildRow(
					'refresh',
					buildCell('refresh', <button
						onClick={() => dispatch(getBet(projectId, projectName))}
						type='submit'
					>Refresh</button>, { colSpan: 2 })
				),
				buildRow(
					'back',
					buildCell('back', <button
						onClick={() => dispatch(getProject())}
						type='submit'
					>Back</button>, { colSpan: 2 })
				)
			]
		)
	);
}

export default BetList;
