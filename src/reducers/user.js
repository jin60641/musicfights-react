import { handleActions } from 'redux-actions';
import {
  login,
  logout,
  loggedIn,
} from 'actions/auth';
import { saveToken } from 'utils/Token';

const initialState = null;

export default handleActions({
  [login.SUCCESS]: (state, action) => {
    const { user, token } = action.payload;
    saveToken(token);
    return { ...user };
  },

  [logout.SUCCESS]: () => ({}),

  [loggedIn.SUCCESS]: (state, action) => ({
    ...action.payload,
  }),
  [loggedIn.FAILURE]: () => ({}),
}, initialState);
