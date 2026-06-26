import { all } from "redux-saga/effects";
import { watchLogin, watchSignup } from "./authSaga";

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchSignup()
    ]);
}