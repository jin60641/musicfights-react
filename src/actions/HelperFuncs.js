import { createAction } from 'redux-actions';

const actionTypes = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CANCEL: 'CANCEL',
  RESET: 'RESET',
};

export const createAsyncAction = (type, async = true) => {
  if (!async) {
    return createAction(type);
  }
  const Action = {
    ORIGIN: type,
    isFetching: false,
  };
  Object.keys(actionTypes).forEach((key) => {
    Action[key] = createAction(`${type}_${actionTypes[key]}`);
  });
  return Action;
};

export const bindActions = actions => Object.entries(actions).reduce((obj, [key, value]) => ({
  ...obj,
  [key]: value.REQUEST || value,
}), {});
