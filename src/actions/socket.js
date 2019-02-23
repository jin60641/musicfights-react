import { mergeMap } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { createAsyncAction } from './HelperFuncs';

export const connectSocket = createAsyncAction('CONNECT_SOCKET');
export const closeSocket = createAsyncAction('CLOSE_SOCKET');

export const fetchCloseSocket = () => closeSocket();

const socketEpic = action$ => action$.pipe(
  ofType(connectSocket.REQUEST),
  mergeMap(() => connectSocket.SUCCESS()),
);

export default combineEpics(
  socketEpic,
);
