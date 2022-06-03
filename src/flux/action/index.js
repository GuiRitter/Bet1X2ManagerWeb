import * as type from './../type';
import * as axios from './axios';

import { API_URL } from '../../constant/system';

import { getUrlWithSearchParams } from '../../util/http';

export const getProject = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/project/list`,
		null,
		value => {
			debugger;
			// dispatch({
			// 	type: type.GET_DONE,
			// 	data: value.data
			// })
		},
		null
	));
};

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const signIn = (login, password) => dispatch => {
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/user/sign_in`, { login, password }),
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
