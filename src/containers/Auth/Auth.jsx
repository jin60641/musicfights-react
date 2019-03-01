import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Join from './Join';
/*
import Login from './Login';
import Find from './Find';
import Change from './Change';
*/

import './Auth.scss';

const Auth = (
  // user: { verify }
) => (
  <div className='Auth'>
    <div className='auth-helper' />
    <Switch>
      <Route
        path='/join'
        component={Join}
      />
    </Switch>
    {/*
    <Route
      path={`${path}/login`}
      render={(props) =>
        verify ?
            <Redirect to={props.location.pathname.replace(props.match.path, '')} />
        :
          <Login
            {...props}
            login={login}
          />
      }
    />
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

Auth.propTypes = {
  // mapStateToProps
  user: PropTypes.shape({
    verify: PropTypes.bool,
  }).isRequired,
};

const stateToProps = ({ user }) => ({ user });

export default connect(stateToProps)(Auth);
