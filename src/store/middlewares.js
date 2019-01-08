import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import rootEpic from '../actions';

let epicMiddleware;

export const runEpics = () => epicMiddleware.run(rootEpic);

export default () => {
  epicMiddleware = createEpicMiddleware();

  const middlewares = [
    epicMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }
  return middlewares;
};
