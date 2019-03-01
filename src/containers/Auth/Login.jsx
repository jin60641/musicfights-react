import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { bindActions } from 'actions/HelperFuncs';
import { login } from 'actions/auth';
import { warningToastr } from 'actions/toastr';

import './Login.scss';

const INPUTS = [{
  type: 'text',
  key: 'email',
  label: '이메일',
}, {
  type: 'password',
  key: 'password',
  label: '비밀번호',
}];

const mapDispatchToProps = bindActions({
  login,
  warningToastr,
});

@connect(null, mapDispatchToProps)
class Login extends Component {
  static propTypes = {
    // mapDispatchToProps
    warningToastr: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { login, warningToastr } = this.props;
    const {
      email,
      password,
    } = this.state;

    if (!email) {
      warningToastr('이메일을 입력해 주세요.');
    } else if (!email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/g)) {
      warningToastr('유효하지 않은 이메일입니다.');
    } else if (!password) {
      warningToastr('비밀번호를 입력해 주세요.');
    } else {
      login({ email, password });
    }
  }

  handleChangeInput = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  }

  render() {
    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        {INPUTS.map(INPUT => (
          <Fragment key={`Login-input-${INPUT.key}`}>
            <label
              className='auth-label'
              htmlFor={INPUT.key}
            >
              {INPUT.label}
              <input
                id={INPUT.key}
                type={INPUT.type}
                className='auth-input'
                onChange={this.handleChangeInput}
              />
            </label>
          </Fragment>
        ))}
        <button
          type='button'
          className='auth-btn login-local'
          onClick={this.handleSubmit}
        >
          로그인
        </button>
        <div className='auth-text'>
비밀번호를 잊으셨나요?
          <Link className='auth-text-link' to='/auth/find'>비밀번호 찾기</Link>
        </div>
        <div className='auth-text'>
아직 회원이 아니신가요?
          <Link className='auth-text-link' to='/auth/signup'>회원가입</Link>
        </div>
        <input type='submit' hidden />
      </form>
    );
  }
}
export default Login;
