import { combineEpics } from 'redux-observable';

import socketEpic from './socket';

const rootEpic = combineEpics(
  socketEpic,
);

export default rootEpic;
