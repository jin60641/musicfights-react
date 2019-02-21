import { handleActions } from 'redux-actions';
import {
  postMusic,
} from 'actions/music';

const initialState = [];

export default handleActions({
  [postMusic.REQUEST]: () => [...initialState],
  [postMusic.SUCCESS]: (state, action) => action.payload,
  [postMusic.FAILURE]: () => [...initialState],
}, initialState);
