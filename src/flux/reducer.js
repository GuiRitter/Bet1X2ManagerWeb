import * as type from './type';

import { LOCAL_STORAGE_NAME } from '../constant/system';

import { getLog } from '../util/log';
import { updateLocalStorage } from '../util/persistence';

const log = getLog('flux.reducer.');

const initialState =
{
	abortMethod: null,
	bet: 0,
	data: null,
	isLoading: false,
	projectId: null,
	projectName: null,
	odd: 0,
	result: null,
	token: null,

	away: null,
	dateTime: null,
	expectedResult: null,
	home: null
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	let nextState = Object.assign({}, currentState);

	if (!nextState.token) {
		nextState.data = null;
	}

	switch (action.type) {

		case type.ABORT_REQUEST:
			return updateLocalStorage({
				...nextState,
				abortController: null,
				isLoading: false,
			});

		case type.AUTHENTICATION:
			return updateLocalStorage({
				...nextState,
				token: action.token
			});

		case type.ENABLE_ABORT_REQUEST:
			return updateLocalStorage({
				...nextState,
				abortMethod: nextState.isLoading ? action.abortMethod : null
			});

		case type.GET_BET:
			return updateLocalStorage({
				...nextState,
				away: null,
				bet: 0,
				data: action.data,
				dateTime: null,
				expectedResult: null,
				home: null,
				odd: 0,
				projectId: action.projectId,
				projectName: action.projectName,
				result: null
			});

		case type.GET_PROJECT:
			return updateLocalStorage({
				...nextState,
				away: null,
				bet: 0,
				data: action.data,
				dateTime: null,
				expectedResult: null,
				home: null,
				odd: 0,
				projectId: null,
				projectName: null,
				result: null
			});

		case type.LOADING:
			return updateLocalStorage({
				...nextState,
				abortController: action.isLoading ? nextState.abortController : null,
				isLoading: action.isLoading
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		case type.SET_ACTION_DATA:
			delete action.type;
			return updateLocalStorage({
				...nextState,
				...action
			});

		default: return nextState;
	}
};

export default reducer;
