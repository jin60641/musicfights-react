import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postMusic, postMusicByYoutube } from 'actions/music';

import Wave from '../Wave';

const mapDispatchToProps = {
  postMusic: postMusic.REQUEST,
  postMusicByYoutube: postMusicByYoutube.REQUEST,
};

@connect(null, mapDispatchToProps)
class Upload extends Component {
  static propTypes = {
    // mapDispatchToProps
    postMusic: PropTypes.func.isRequired,
    postMusicByYoutube: PropTypes.func.isRequired,
  }

  handleChangeFile = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    const { postMusic } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    postMusic(formData);
  }

  handleKeyDownText = ({ key, target: { value } }) => {
    const { postMusicByYoutube } = this.props;
    if (key === 'Enter') {
      postMusicByYoutube({ url: value });
    }
  }

  render() {
    return (
      <div className='Upload'>
        <input
          type='file'
          onChange={this.handleChangeFile}
        />
        <input
          type='text'
          onKeyDown={this.handleKeyDownText}
        />
        <Wave />
      </div>
    );
  }
}

export default Upload;
