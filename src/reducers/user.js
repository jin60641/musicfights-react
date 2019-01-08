import { handleActions } from 'redux-actions';
import {
  login, logout, loggedIn,
} from '../actions/auth';

const initialState = null;

export default handleActions({
  [login.SUCCESS]: (state, action) => Object.assign({}, action.payload),

  [logout.SUCCESS]: () => ({}),

  [loggedIn.SUCCESS]: (state, action) => Object.assign({}, action.payload),
  [loggedIn.FAILURE]: () => ({}),
}, initialState);
