import { call, put, takeLatest } from 'redux-saga/effects'
import type { SagaIterator } from "redux-saga";

import axios from "axios";
import { API_URL } from '../../config/api';
import { USER_ID } from '../../config/localStorageKeys';
import { setUserdetails } from '../authSlice';
import { createAction } from '@reduxjs/toolkit';

interface LoginPayload {
  email: string;
  password: string;
}


export const loginAction = createAction<LoginPayload>("LOGIN");

export function loginApi(data : any) {
    return axios.post(`${API_URL}/api/auth/login`, data);
}

export function* login(action : { payload : LoginPayload }) : SagaIterator{

    try {
        const res = yield call(loginApi, action.payload);

        localStorage.setItem(USER_ID, res.data.data.user_id);

        yield put(setUserdetails(res.data.data));

    }   catch(err){
        console.log("error occrued while login", err);
    } 
}

export function* watchLogin(): SagaIterator {
    yield takeLatest(loginAction, login);
}
