import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { restoreFromLocalStorage } from '../flux/action/index';

import { getLog } from '../util/log';

import './App.css';

import BetList from './BetList';
import Loading from './Loading';
import Project from './Project';
import SignIn from './SignIn';

const log = getLog('App.');

function componentDidMount(props, dispatch) {
	dispatch(restoreFromLocalStorage());
}

function App(props) {

	const didMountRef = useRef(false);

	const isAuthenticated = useSelector(state => !!(((state || {}).reducer || {}).token));
	const isLoading = useSelector(state => ((state || {}).reducer || {}).isLoading);
	const projectId = useSelector(state => ((state || {}).reducer || {}).projectId);

	const dispatch = useDispatch();

	log('App', { isAuthenticated, isLoading });

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch);
		}
	});

	if (isLoading) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		return <SignIn />;
	}
	
	if (projectId) {
		return <BetList />;
	}

	return <Project />;
}

export default App;
