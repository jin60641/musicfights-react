import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import SignUp from './SignUp';
import Login from './Login';
import Mail from './Mail';
/*
import Find from './Find';
import Change from './Change';
*/

import './Auth.scss';

const Auth = () => (
  <div className='Auth'>
    <Switch>
      <Route
        path='/mail/:email/:link'
        render={props => <Mail {...props} />}
      />
      <Route
        path='/login'
        component={Login}
      />
      <Route
        path='/signup'
        component={SignUp}
      />
      <Redirect to='/login' />
    </Switch>
    {/*
    <Route
      path={`${path}/find`}
      render={props => (
        <Find
          {...props}
        />
      )}
    />
    <Route
      path={`${path}/change/:email?/:link?`}
      render={props => (
        <Change
          {...props}
        />
      )}
    />
    */}
  </div>
);

export default Auth;
