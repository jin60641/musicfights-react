import Cookies from 'js-cookie';

const tokenKey = 'token';

export const saveToken = (token) => {
  Cookies.set(tokenKey, token);
};

export const getToken = () => Cookies.get(tokenKey) || '';
