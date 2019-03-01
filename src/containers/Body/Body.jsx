import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

const Upload = lazy(() => import('../Upload'));

const Body = () => (
  <div className='Body'>
    <Suspense fallback={<div />}>
      <Switch>
        <Route
          exact
          path='/'
          component={Upload}
        />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  </div>
);

export default withRouter(Body);
