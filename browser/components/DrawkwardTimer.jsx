import React, { Component } from 'react';
import socket from '../socket';

import {connect} from 'react-redux';
import { setTimer, countdown } from '../reducers/timer';
import { TIME_IS_UP } from '../../socketConstants';

const mapStateToProps = state => ({
  secondsRemaining: state.timer.secondsRemaining
});

const mapDispatchToProps = dispatch => ({
  setTimer: startingSeconds => dispatch(setTimer(startingSeconds)),
  countdown: () => dispatch(countdown()),
});

class DrawkwardTimer extends Component {

  componentWillMount() {
    this.props.setTimer(60);
  }

  componentDidMount() {
    this.interval = setInterval(this.props.countdown, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secondsRemaining === 0) {
      socket.emit(TIME_IS_UP);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.props.secondsRemaining > 0 ?
          <div id="countdown-timer">
            <h2>Finish your drawings before time runs out!</h2>
            <div id="show-seconds">
              <h1>{this.props.secondsRemaining}</h1>
            </div>
            <div id="floating-pig">
            </div>
          </div>
          : <h1>TIME IS UP! SUBMIT ALL DRAWINGS!</h1>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardTimer);
