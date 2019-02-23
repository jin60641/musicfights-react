import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = ({
  music: {
    vid,
    start,
    duration,
  },
}) => ({
  vid,
  start,
  duration,
});

@connect(mapStateToProps)
class Play extends Component {
  static propTypes = {
    // mapStateToProps
    vid: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      url: '',
    };
  }

  handleClickPlay = () => {
    const {
      vid,
      start,
      duration,
    } = this.props;

    this.setState({ url: `/api/music/${vid}/${start}/${duration}` });
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
          <audio autoPlay>
            <track kind='captions' />
            <source src={url} />
          </audio>
        )}
      </div>
    );
  }
}

export default Play;
