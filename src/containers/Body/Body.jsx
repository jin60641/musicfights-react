import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

// const Error = lazy(() => import('../Error/Error'));
const Upload = lazy(() => import('../Upload/Upload'));

const Body = () => (
  <div className='Body'>
    <Suspense fallback={<div />}>
      <Switch>
        <Route
          exact
          path='/'
          render={<Upload />}
        />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  </div>
);

export default withRouter(Body);
