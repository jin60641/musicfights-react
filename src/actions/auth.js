import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { createAsyncAction } from './HelperFuncs';

import { connectSocket } from './socket';
import { successToastr, warningToastr } from './toastr';

import api from '../api/auth';

export const login = createAsyncAction('LOGIN');
export const logout = createAsyncAction('LOGOUT');
export const loggedIn = createAsyncAction('LOGGEDIN');
export const join = createAsyncAction('JOIN');
export const verifyMail = createAsyncAction('VERIFY_MAIL');
export const findPw = createAsyncAction('FIND_PW');
export const changePw = createAsyncAction('CHANGE_PW');

const loginEpic = action$ => action$.pipe(
  ofType(login.REQUEST),
  mergeMap(action => from(api.login(action.payload))),
  mergeMap(body => (body.data ? [
    login.SUCCESS(body.data),
    connectSocket.REQUEST(),
    successToastr(body.message),
  ] : [
    login.FAILURE(body.message),
    warningToastr(body.message),
  ])),
);

const logoutEpic = action$ => action$.pipe(
  ofType(logout.REQUEST),
  mergeMap(() => from(api.logout())),
  mergeMap(body => (body.data ? [
    logout.SUCCESS(body.data),
    successToastr(body.message),
  ] : [
    logout.FAILURE(body.message),
    warningToastr(body.message),
  ])),
);

const loggedInEpic = action$ => action$.pipe(
  ofType(loggedIn.REQUEST),
  mergeMap(() => from(api.loggedIn())),
  mergeMap(body => (body.data ? [
    loggedIn.SUCCESS(body.data),
    connectSocket.REQUEST(),
  ] : [
    loggedIn.FAILURE(body.message),
  ])),
);

const joinEpic = action$ => action$.pipe(
  ofType(join.REQUEST),
  mergeMap(action => from(api.join(action.payload))),
  mergeMap(body => (body.data ? [
    join.SUCCESS(body.data),
    successToastr(body.message),
  ] : [
    join.FAILURE(body.message),
    warningToastr(body.message),
  ])),
);

const verifyMailEpic = action$ => action$.pipe(
  ofType(verifyMail.REQUEST),
  mergeMap(action => from(api.verifyMail(action.payload))),
  map(body => (body.data
    ? verifyMail.SUCCESS(body.data)
    : verifyMail.FAILURE(body.message))),
);

const findPwEpic = action$ => action$.pipe(
  ofType(findPw.REQUEST),
  mergeMap(action => from(api.findPw(action.payload))),
  mergeMap(body => (body.data ? [
    findPw.SUCCESS(body.data),
    successToastr(body.message),
  ] : [
    findPw.FAILURE(body.message),
    warningToastr(body.message),
  ])),
);

const changePwEpic = action$ => action$.pipe(
  ofType(changePw.REQUEST),
  mergeMap(action => from(api.changePw(action.payload))),
  mergeMap(body => (body.data ? [
    changePw.SUCCESS(body.data),
    successToastr(body.message),
  ] : [
    changePw.FAILURE(body.message),
    warningToastr(body.message),
  ])),
);

export default combineEpics(
  loginEpic,
  loggedInEpic,
  logoutEpic,
  joinEpic,
  verifyMailEpic,
  findPwEpic,
  changePwEpic,
);
