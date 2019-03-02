import { handleActions } from 'redux-actions';
import io from 'socket.io-client';
import { getToken } from 'utils/Token';

const socket = io({ query: { token: getToken() } });
const { onevent } = socket;
socket.onevent = (packet) => {
  const args = packet.data || [];
  onevent.call(this, packet);
  onevent.call(this, {
    ...packet,
    data: ['*'].concat(args),
  });
};

export default handleActions({}, socket);
