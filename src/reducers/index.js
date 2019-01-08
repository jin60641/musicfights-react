import { combineReducers } from 'redux';

import user from './user';
import socket from './socket';

export default combineReducers({
  user,
  socket,
});
