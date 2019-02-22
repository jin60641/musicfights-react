import Fetch from './Fetch';

const postMusicUri = '/api/music';
const postMusicByYoutubeUri = '/api/music/youtube';

const obj = {};

obj.postMusic = data => Fetch('POST', postMusicUri, data);
obj.postMusicByYoutube = data => Fetch('POST', postMusicByYoutubeUri, data);

export default obj;
