import React/*, { useEffect, useRef }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBet, getProject, signOut } from '../flux/action/index';

import { buildCell, buildRow, buildTable } from '../util/html';

import { getLog } from '../util/log';

const log = getLog('Project.');

function Project(props) {

	const dispatch = useDispatch();

	const projectList = useSelector(state => (((state || {}).reducer || {}).data)) || [];

	log('Project', { projectList });

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>Projects</h1>)),
			buildRow(
				'header',
				buildCell('name', 'Name'),
				buildCell('manage', '')
			)
		].concat(projectList.map((project, index) => buildRow(
			`project_${index}`,
			buildCell(`name_${index}`, project.name),
			buildCell(`manage_${index}`, <button
				onClick={() => dispatch(getBet(project.id, project.name))}
				type='submit'
			>Manage</button>)
		))).concat(
			[
				buildRow(
					'refresh',
					buildCell('refresh', <button
						onClick={() => dispatch(getProject())}
						type='submit'
					>Refresh</button>, { colSpan: 2 })
				),
				buildRow(
					'sign_out',
					buildCell('sign_out', <button
						onClick={() => dispatch(signOut())}
						type='submit'
					>Sign out</button>, { colSpan: 2 })
				)
			]
		)
	);
}

export default Project;
