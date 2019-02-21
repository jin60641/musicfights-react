import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import createAction from './createAsyncAction';

import api from '../api/music';

import { successToastr, warningToastr } from './toastr';

export const postMusic = createAction('POST_MUSIC');

const postMusicEpic = action$ => action$.pipe(
  ofType(postMusic.REQUEST),
  mergeMap(action => from(api.postMusic(action.payload))),
  mergeMap(body => (body.data
    ? [postMusic.SUCCESS(body.data), successToastr(body.message)]
    : [postMusic.FAILURE(new Error(body.message)), warningToastr(body.message)])),
);

export default combineEpics(
  postMusicEpic,
);
