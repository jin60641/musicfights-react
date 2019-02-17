import { combineEpics } from 'redux-observable';

import authEpic from './auth';
import socketEpic from './socket';

const rootEpic = combineEpics(
  authEpic,
  socketEpic,
);

export default rootEpic;
