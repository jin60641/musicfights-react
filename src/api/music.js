import Fetch from './Fetch';

const postMusicUri = '/api/music';

const obj = {};

obj.postMusic = data => Fetch('POST', postMusicUri, data);

export default obj;
