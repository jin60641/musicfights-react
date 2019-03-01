import { handleActions } from 'redux-actions';
import {
  setMusicStart,
  setMusicCurrent,
  postMusic,
  postMusicByYoutube,
} from 'actions/music';

const initialState = {
  vid: '',
  bars: [],
  start: 0,
  duration: 3,
  current: 0,
};

export default handleActions({
  [setMusicStart]: (state, action) => ({ ...state, start: action.payload }),
  [setMusicCurrent]: (state, action) => ({ ...state, current: action.payload }),
  [postMusic.REQUEST]: state => ({ ...state, bars: [...initialState.bars] }),
  [postMusicByYoutube.REQUEST]: (state, { payload: { vid } }) => ({
    ...state,
    bars: [...initialState.bars],
    vid,
  }),
  [postMusic.SUCCESS]: (state, action) => ({
    ...state,
    bars: [...action.payload],
    start: action.payload.length / 2 - state.duration,
  }),
  [postMusic.FAILURE]: state => ({ ...state, bars: [...initialState.bars] }),
}, initialState);
