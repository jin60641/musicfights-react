import { handleActions } from 'redux-actions';
import {
  setMusicStart,
  postMusic,
  postMusicByYoutube,
} from 'actions/music';

const initialState = {
  vid: '',
  bars: [],
  start: 0,
  duration: 3,
};

export default handleActions({
  [setMusicStart]: (state, action) => ({ ...state, start: action.payload }),
  [postMusic.REQUEST]: state => ({ ...state, bars: [...initialState.bars] }),
  [postMusicByYoutube.REQUEST]: (state, { payload: { vid } }) => ({
    ...state,
    bars: [...initialState.bars],
    vid,
  }),
  [postMusic.SUCCESS]: (state, action) => ({ ...state, bars: [...action.payload] }),
  [postMusic.FAILURE]: state => ({ ...state, bars: [...initialState.bars] }),
}, initialState);
