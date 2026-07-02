import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import axios from "axios";
import { API_URL } from "../../config/api";
import { USER_ID } from "../../config/localStorageKeys";
import { setUserdetails } from "../authSlice";
import { createAction } from "@reduxjs/toolkit";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

/**
 * login saga
 */
export const loginAction = createAction<LoginPayload>("LOGIN");

export function loginApi(data: LoginPayload) {
  return axios.post(`${API_URL}/user/login`, data, {
    withCredentials : true
  });
}

export function* login(action: { payload: LoginPayload }): SagaIterator {
  try {
    const res = yield call(loginApi, action.payload);

    localStorage.setItem(USER_ID, res.data.user.user_id);
    console.log("res.data.data.user_id", res.data.user.user_id);
    yield put(setUserdetails(res.data.user));
  } catch (err) {
    console.log("error occrued while login", err);
  }
}

/**
 * Sign up saga
 */

export const signupAction = createAction<SignupPayload>("SIGNUP");

function signupApi(data: SignupPayload) {
  return axios.post(`${API_URL}/user/create`, data, {
    withCredentials : true
  });
}

export function* signup(action: { payload: SignupPayload }): SagaIterator {
  try {
    const res = yield call(signupApi, action.payload);

    const data = res.data.user;
    console.log("User created:", res.data);
    
    localStorage.setItem(USER_ID, data.id);

    yield put(setUserdetails(data));

  } catch (err) {
    console.log("error occured while signing up user", err);
  }
}

export function* watchLogin(): SagaIterator {
  yield takeLatest(loginAction, login);
}

export function* watchSignup(): SagaIterator {
    yield takeLatest(signupAction, signup);
}