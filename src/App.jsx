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
          Hello, World
        </>
      </Router>
    );
  }
}

export default App;
