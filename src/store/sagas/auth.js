import { put, call } from "redux-saga/effects";
import * as actions from "../actions/index";
import { delay } from "redux-saga/effects";
import axios from "axios";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email.value,
    password: action.password.value,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCk-bdNZxJiTdPKQg-8MQfxTDH81b_JE24";

  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCk-bdNZxJiTdPKQg-8MQfxTDH81b_JE24";
  }

  try {
    const resp = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + resp.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", resp.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", resp.data.localId);
    yield put(actions.authSuccess(resp.data.idToken, resp.data.localId));
    yield put(actions.checkAuthTimeout(resp.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );

    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
