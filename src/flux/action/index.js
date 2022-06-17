import * as type from './../type';
import * as axios from './axios';

import { API_URL } from '../../constant/system';

import { getUrlWithSearchParams } from '../../util/http';

export const closeBet = () => (dispatch, getState) => {
	dispatch(axios.post(
		`${API_URL}/bet/close`,
		{
			projectId: getState().reducer.projectId,
			actualResult: getState().reducer.actualResult
		},
		null,
		value => dispatch(getBet(getState().reducer.projectId, getState().reducer.projectName)),
		null
	));
};

export const getBet = (projectId, projectName) => dispatch => {
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/bet/list`, { projectId }),
		null,
		value => dispatch({
			type: type.GET_BET,
			data: value.data,
			projectId,
			projectName
		}),
		null
	));
};

export const getProject = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/project/list`,
		null,
		value => dispatch({
			type: type.GET_PROJECT,
			data: value.data
		}),
		null
	));
};

export const placeBet = () => (dispatch, getState) => {
	dispatch(axios.post(
		`${API_URL}/bet/place`,
		{
			projectId: getState().reducer.projectId,
			dateTime: getState().reducer.dateTime,
			home: getState().reducer.home,
			away: getState().reducer.away,
			expectedResult: getState().reducer.expectedResult,
			odd: getState().reducer.odd,
			bet: getState().reducer.bet
		},
		null,
		value => dispatch(getBet(getState().reducer.projectId, getState().reducer.projectName)),
		null
	));
};

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setActionData = (dataName, dataValue) => (dispatch, getState) => {
	if (dataValue === getState().reducer[dataName]) {
		return;
	}
	dispatch({
		type: type.SET_ACTION_DATA,
		[dataName]: dataValue
	});
};

export const setAway = away => (dispatch, getState) => {
	dispatch(setActionData('away', away));
};

export const setBet = bet => (dispatch, getState) => {
	dispatch(setActionData('bet', bet));
};

export const setDateTime = dateTime => (dispatch, getState) => {
	dispatch(setActionData('dateTime', dateTime));
};

export const setExpectedResult = expectedResult => (dispatch, getState) => {
	dispatch(setActionData('expectedResult', expectedResult));
};

export const setHome = home => (dispatch, getState) => {
	dispatch(setActionData('home', home));
};

export const setOdd = odd => (dispatch, getState) => {
	dispatch(setActionData('odd', odd));
};

export const setResult = actualResult => (dispatch, getState) => {
	dispatch(setActionData('actualResult', actualResult));
};

export const signIn = (login, password) => dispatch => {
	dispatch(axios.post(
		`${API_URL}/user/sign_in`,
		{ login, password },
		null,
		value => {
			if (!value) {
				alert('log in failed');
				return;
			}
			let data = value.data;
			if (!data) {
				alert('log in failed');
				return;
			}
			data = data.data;
			if (!data) {
				alert('log in failed');
				return;
			}
			let token = data.token;
			if (!token) {
				alert('log in failed');
				return;
			}
			dispatch({
				type: type.AUTHENTICATION,
				token
			})
		},
		null
	));
};

export const signOut = () => ({
	type: type.AUTHENTICATION,
	token: null
});
