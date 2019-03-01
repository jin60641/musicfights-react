import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActions } from 'actions/HelperFuncs';
import { setMusicCurrent } from 'actions/music';

const INITIAL_STATE = {
  url: '',
};

const mapStateToProps = ({
  music: {
    vid,
    start,
    duration,
    current,
  },
}) => ({
  vid,
  start,
  duration,
  current,
});

const mapDispatchToProps = bindActions({
  setMusicCurrent,
});

@connect(mapStateToProps, mapDispatchToProps)
class Play extends Component {
  static propTypes = {
    // mapStateToProps
    vid: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,

    // mapDispatchToProps
    setMusicCurrent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleClickPlay = () => {
    const {
      vid,
      start,
      duration,
    } = this.props;

    this.setState({
      url: `/api/music/${vid}/${start}/${duration}`,
    });
  }

  handleEndedAudio = () => {
    const { duration } = this.props;
    setMusicCurrent(duration);
    this.setState({ ...INITIAL_STATE });
  }

  handleTimeUpdateAudio = ({ target: { currentTime } }) => {
    const { current, setMusicCurrent } = this.props;
    const nextCurrent = Math.floor(currentTime);
    if (current === nextCurrent) {
      return;
    }
    setMusicCurrent(nextCurrent);
  }

  render() {
    const { url } = this.state;
    return (
      <div className='Play'>
        <input
          type='button'
          onClick={this.handleClickPlay}
        />
        {url && (
          <audio
            autoPlay
            onEnded={this.handleEndedAudio}
            onTimeUpdate={this.handleTimeUpdateAudio}
          >
            <track kind='captions' />
            <source src={url} />
          </audio>
        )}
      </div>
    );
  }
}

export default Play;
