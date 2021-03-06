import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActions } from 'actions/HelperFuncs';
import { signUp } from 'actions/auth';
import { warningToastr } from 'actions/toastr';

const INPUTS = [{
  type: 'text',
  key: 'email',
  label: '이메일',
}, {
  type: 'text',
  key: 'name',
  label: '이름',
}, {
  type: 'text',
  key: 'handle',
  label: '핸들',
}, {
  type: 'password',
  key: 'password',
  label: '비밀번호',
}, {
  type: 'password',
  key: 'passwordCheck',
  label: '비밀번호 확인',
}];

const mapDispatchToProps = bindActions({
  signUp,
  warningToastr,
});

@connect(null, mapDispatchToProps)
class SingUp extends Component {
  static propTypes = {
    // mapDispatchToProps
    warningToastr: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordCheck: '',
      handle: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signUp, warningToastr } = this.props;
    const {
      email,
      name,
      password,
      passwordCheck,
      handle,
    } = this.state;

    if (!email) {
      warningToastr('이메일을 입력해 주세요.');
    } else if (!email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/g)) {
      warningToastr('유효하지 않은 이메일입니다.');
    } else if (!name) {
      warningToastr('이름을 입력해 주세요.');
    } else if (!handle) {
      warningToastr('핸들을 입력해 주세요.');
    } else if (!password) {
      warningToastr('비밀번호를 입력해 주세요.');
    } else if (passwordCheck !== password) {
      warningToastr('비밀번호 확인이 일치하지 않습니다.');
    } else {
      signUp({
        email,
        password,
        name,
        handle,
      });
    }
  }

  handleChangeInput = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  }

  render() {
    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        {INPUTS.map(INPUT => (
          <Fragment key={`SingUp-input-${INPUT.key}`}>
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
          className='auth-btn'
          onClick={this.handleSubmit}
        >
          회원가입
        </button>
        <input type='submit' hidden />
      </form>
    );
  }
}

export default SingUp;
