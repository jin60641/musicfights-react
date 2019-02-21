import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postMusic } from 'actions/music';

import Wave from '../Wave';

const mapDispatchToProps = {
  postMusic: postMusic.REQUEST,
};

@connect(null, mapDispatchToProps)
class Upload extends Component {
  static propTypes = {
    // mapDispatchToProps
    postMusic: PropTypes.func.isRequired,
  }

  handleChangeFile = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    const { postMusic } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    postMusic(formData);
  }

  render() {
    return (
      <div className='Upload'>
        <input
          type='file'
          onChange={this.handleChangeFile}
        />
        <Wave />
      </div>
    );
  }
}

export default Upload;
