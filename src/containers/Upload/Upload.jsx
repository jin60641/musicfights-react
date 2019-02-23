import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActions } from 'actions/HelperFuncs';
import { postMusic, postMusicByYoutube } from 'actions/music';

import Wave from '../Wave';
import Play from '../Play';

const mapDispatchToProps = bindActions({
  postMusic,
  postMusicByYoutube,
});

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
      const match = value.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/);
      if (match && match[1].length === 11) {
        postMusicByYoutube({ vid: match[1] });
      }
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
        <Play />
      </div>
    );
  }
}

export default Upload;
