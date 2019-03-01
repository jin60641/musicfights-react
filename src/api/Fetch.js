import { getToken } from 'utils/Token';

const Fetch = (method, uri, data) => {
  const options = {
    method,
    credentials: 'include',
  };
  let headers = {
    'x-access-token': getToken(),
  };
  if (data) {
    if (data.constructor !== FormData) {
      headers = {
        ...headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(data);
    } else {
      options.body = data;
    }
  }
  options.headers = headers;
  return fetch(uri, options)
    .then(resp => resp.json())
    .catch(({ message }) => ({ message }));
};
export default Fetch;
