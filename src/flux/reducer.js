import * as type from './type';

import { LOCAL_STORAGE_NAME } from '../constant/system';

import { getLog } from '../util/log';
import { updateLocalStorage } from '../util/persistence';

const log = getLog('flux.reducer.');

const initialState =
{
	abortMethod: null,
	data: null,
	isLoading: false,
	projectId: null,
	token: null
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	let nextState = Object.assign({}, currentState);

	// if ((nextState.state === state.MENU) || (!nextState.token)) {
	// 	nextState.data = null;
	// }

	// if (nextState.state == state.READ_ARTIST) {
	// 	nextState.data = {
	// 		...nextState.data,
	// 		artist: {
	// 			count: 0,
	// 			list: [],
	// 			pageNumber: 0,
	// 			pageSize: 30
	// 		}
	// 	};
	// }

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

		case type.LOADING:
			return updateLocalStorage({
				...nextState,
				abortController: action.isLoading ? nextState.abortController : null,
				isLoading: action.isLoading
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		default: return nextState;
	}
};

export default reducer;
