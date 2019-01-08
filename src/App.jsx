import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Toastr from 'components/Toastr/Toastr';

import { loggedIn } from 'actions/auth';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  loggedIn: loggedIn.REQUEST,
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    // mapStateToProps
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
    ]).isRequired,

    // mapDispatchToProps
    loggedIn: PropTypes.func.isRequired,
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
        <div>
          <Toastr />
          Hello, World
        </div>
      </Router>
    );
  }
}

export default App;
