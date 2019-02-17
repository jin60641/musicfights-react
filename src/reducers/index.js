import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import user from './user';
import socket from './socket';

export default combineReducers({
  toastr,
  user,
  socket,
});
