import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActions } from 'actions/HelperFuncs';
import { setMusicStart } from 'actions/music';

import './Wave.scss';

const FPS = 30;
const BAR_WIDTH = 8;
const BAR_MARGIN = 2;
const BAR_SPACE = BAR_WIDTH + BAR_MARGIN;
const SECOND_WIDTH = 2;
const SECOND_HEIGHT = 5;

const INITIAL_STATE = {
  duration: 0,
  width: 0,
  height: 0,
  cursor: 0,
  sinIndex: 0,
  mouseX: null,
};

const mapStateToProps = ({
  music: {
    bars,
    start,
    duration,
    current,
  },
}) => ({
  bars,
  start,
  duration,
  current,
});

const mapDispatchToProps = bindActions({
  setMusicStart,
});

@connect(mapStateToProps, mapDispatchToProps)
class Wave extends Component {
  static propTypes = {
    // mapStateToProps
    bars: PropTypes.arrayOf(PropTypes.number).isRequired,
    start: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,

    // mapDispatchToProps
    setMusicStart: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.canvasRef = createRef();
    this.canvasTimer = null;
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.canvasTimer = setInterval(this.renderCanvas, 1000 / FPS);
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  }

  componentWillUnmount() {
    this.canvasTimer = clearInterval(this.canvasTimer);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({
      width,
      height: height / 4,
    });
  }

  handleCanvasMouseDown = ({ clientX, touches = [] }) => {
    const [touch = {}] = touches;
    this.setState({
      mouseX: clientX || touch.pageX || null,
    });
  }

  handleCanvasMouseMove = ({ clientX, touches = [] }) => {
    const [touch = {}] = touches;
    const spot = clientX || touch.pageX || null;
    const {
      bars,
      start,
      duration,
      setMusicStart,
    } = this.props;
    const { mouseX, width } = this.state;
    if (!spot || !mouseX) {
      return;
    }
    const min = -((bars.length * BAR_SPACE) - (width / 2) - (duration * BAR_SPACE));
    const max = width / 2;
    this.setState(({ cursor }) => ({
      cursor: Math.max(min, Math.min(max, cursor + spot - mouseX)),
      mouseX: spot,
    }), () => {
      const { cursor } = this.state;
      const nowStart = Math.floor((-cursor + max) / BAR_SPACE);
      if (nowStart !== start) {
        setMusicStart(nowStart);
      }
    });
  }

  handleCanvasMouseUp = () => {
    this.setState({
      mouseX: null,
    });
  }

  renderCanvas = () => {
    const ctx = this.canvasRef.current.getContext('2d');
    const {
      start,
      bars,
      duration,
      current,
    } = this.props;
    const {
      width,
      height,
      sinIndex,
      cursor,
    } = this.state;

    ctx.clearRect(0, 0, width, height);
    if (bars.length) {
      const maxHeight = height - 50;
      bars.forEach((bar, idx) => {
        const x = idx * BAR_SPACE;
        const center = -cursor + width / 2;
        if (x >= center && x < center + BAR_SPACE * duration) {
          if (idx < start + current) {
            ctx.fillStyle = '#ff5c26';
          } else {
            ctx.fillStyle = '#FFB5AB';
          }
        } else {
          ctx.fillStyle = '#D0D9DD';
        }
        ctx.textBaseline = 'top';
        const barHeight = Math.max(2, bar * maxHeight);
        ctx.fillRect(x + cursor, maxHeight - barHeight, BAR_WIDTH, barHeight);
        ctx.fillStyle = '#000000';
        if (idx % 50 === 0) {
          ctx.fillRect(x + cursor + (BAR_WIDTH / 2), maxHeight, SECOND_WIDTH, SECOND_HEIGHT);
          ctx.textAlign = 'center';
          ctx.font = '20px Arial';
          ctx.fillText(idx, x + cursor + (BAR_WIDTH / 2), maxHeight + SECOND_HEIGHT + 3);
        // } else {
        //  ctx.fillRect( bars[i].x + cursor, height * 3/5, 1 ,height * 1/5 - 10);
        }
      });
    } else {
      for (let i = 0; i < width; i += BAR_SPACE) {
        const screenWidth = window.screen.width;
        const x = i;
        let sin = Math.sin((x * screenWidth / width + sinIndex * 30) / (screenWidth / 4)) * height;
        sin = height / 2 + sin / 2;
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#ff5c26';
        ctx.fillRect(x, height - sin, BAR_WIDTH, sin);
        ctx.fillStyle = '#f15c3e';
        ctx.fillRect(x, sin, BAR_WIDTH, height - sin);
        ctx.restore();
      }
      this.setState({
        sinIndex: sinIndex + 1,
      });
    }
  }

  render() {
    const { width, height } = this.state;
    return (
      <canvas
        className='Wave'
        ref={this.canvasRef}
        width={width}
        height={height}
        onMouseDown={this.handleCanvasMouseDown}
        onMouseMove={this.handleCanvasMouseMove}
        onMouseUp={this.handleCanvasMouseUp}
      />
    );
  }
}

export default Wave;
