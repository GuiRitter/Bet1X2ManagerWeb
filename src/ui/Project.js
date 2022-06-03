import React/*, { useEffect, useRef }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProject, signOut } from '../flux/action/index';

import { buildCell, buildRow, buildTable } from '../util/html';

function Project(props) {

	// const didMountRef = useRef(false);
	const dispatch = useDispatch();

	const projectList = useSelector(state => !!(((state || {}).reducer || {}).data)) || [];

	// useEffect(() => {
	// 	if (didMountRef.current) {
	// 		// componentDidUpdate(props, prevProps);
	// 	} else {
	// 		didMountRef.current = true;
	// 		componentDidMount(props);
	// 	}
	// });

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>Projects</h1>)),
			buildRow(
				'header',
				buildCell('name', 'Name'),
				buildCell('button', <button
					onClick={() => alert('TO DO')}
					type='submit'
				>Manage</button>)
			)
		].concat(projectList).concat(
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
