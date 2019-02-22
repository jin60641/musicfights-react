import { handleActions } from 'redux-actions';
import {
  postMusic,
  postMusicByYoutube,
} from 'actions/music';

const initialState = [];

export default handleActions({
  [postMusic.REQUEST]: () => [...initialState],
  [postMusicByYoutube.REQUEST]: () => [...initialState],
  [postMusic.SUCCESS]: (state, action) => action.payload,
  [postMusic.FAILURE]: () => [...initialState],
}, initialState);
