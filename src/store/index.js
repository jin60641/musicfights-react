import { createStore, applyMiddleware, compose } from 'redux';
import createMiddlewares, { runEpics } from './middlewares';
import rootReducer from '../reducers';

const middlewares = createMiddlewares();

const store = process.env.NODE_ENV === 'development'
  ? createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  )
  : createStore(rootReducer, compose(applyMiddleware(...middlewares)));

runEpics();

export default store;
