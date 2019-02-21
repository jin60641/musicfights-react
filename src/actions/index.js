import { combineEpics } from 'redux-observable';

import authEpic from './auth';
import musicEpic from './music';
import socketEpic from './socket';

const rootEpic = combineEpics(
  authEpic,
  musicEpic,
  socketEpic,
);

export default rootEpic;
