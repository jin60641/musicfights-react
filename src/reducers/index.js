import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import user from './user';
import music from './music';
import socket from './socket';

export default combineReducers({
  user,
  music,
  socket,
  toastr,
});
