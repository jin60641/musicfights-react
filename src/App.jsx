import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loggedIn } from 'actions/auth';

import Toastr from 'components/Toastr';
import Auth from './containers/Auth';
import Body from './containers/Body';


const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  loggedIn: loggedIn.REQUEST,
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    // mapStateToProps
    user: PropTypes.shape({
      id: PropTypes.number,
    }),

    // mapDispatchToProps
    loggedIn: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: null,
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    loggedIn();
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }

    return (
      <Router>
        <>
          <Toastr />
          {user.id ? <Body /> : <Auth />}
        </>
      </Router>
    );
  }
}

export default App;
