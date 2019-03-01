import Fetch from './Fetch';

const loginUri = '/api/auth/login';
const logoutUri = '/api/auth/logout';
const loggedInUri = '/api/auth/loggedin';
const signUpUri = '/api/auth/signup';
const verifyMailUri = '/api/auth/verify';
const findPwUri = '/api/auth/findpw';
const changePwUri = '/api/auth/changepw';

const obj = {};

obj.login = data => Fetch('POST', loginUri, data);
obj.logout = () => Fetch('POST', logoutUri);
obj.loggedIn = () => Fetch('POST', loggedInUri);
obj.signUp = data => Fetch('POST', signUpUri, data);
obj.verifyMail = data => Fetch('POST', verifyMailUri, data);
obj.findPw = data => Fetch('POST', findPwUri, data);
obj.changePw = data => Fetch('POST', changePwUri, data);

export default obj;
