import { mergeMap } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import createAction from './createAsyncAction';

export const connectSocket = createAction('CONNECT_SOCKET');
export const closeSocket = createAction('CLOSE_SOCKET');

export const fetchCloseSocket = () => closeSocket();

const socketEpic = action$ => action$.pipe(
  ofType(connectSocket.REQUEST),
  mergeMap(() => connectSocket.SUCCESS()),
);

export default combineEpics(
  socketEpic,
);
