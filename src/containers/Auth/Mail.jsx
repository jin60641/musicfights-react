import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { verifyMail } from 'actions/auth';

import './Mail.scss';

const mapDispatchToProps = {
  verifyMail: verifyMail.REQUEST,
};

@connect(null, mapDispatchToProps)
class Mail extends Component {
  static propTypes = {
    // mapDipsatchToProps
    verifyMail: PropTypes.func.isRequired,

    // router
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  componentDidMount() {
    const {
      verifyMail,
      match: {
        params: {
          email,
          link,
        },
      },
    } = this.props;
    verifyMail({ email, link });
  }

  render() {
    return (
      <div className='Mail auth-form'>
        <div className='mail-wrap'>
          <div className='mail-body'>
            <div className='mail-text'>
              E-mail verification complete
            </div>
            <Link to='/auth/login' className='mail-btn'>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Mail;
