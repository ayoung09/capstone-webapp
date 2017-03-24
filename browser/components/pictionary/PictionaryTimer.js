import React, { Component } from 'react';
import socket from '../../socket';

import {connect} from 'react-redux';
import { setTimer, countdown } from '../../reducers/timer';
import { TIMER_DONE } from '../../../socketConstants';

const mapStateToProps = state => ({
  secondsRemaining: state.timer.secondsRemaining
});

const mapDispatchToProps = dispatch => ({
  setTimer: startingSeconds => dispatch(setTimer(startingSeconds)),
  countdown: () => dispatch(countdown()),
});

class PictionaryTimer extends Component {

  componentWillMount() {
    this.props.setTimer(60);
  }

  componentDidMount() {
    this.interval = setInterval(this.props.countdown, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secondsRemaining === 0) {
      socket.emit(TIMER_DONE);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="countdown-timer">
        {this.props.secondsRemaining > 0 ?
          <div>
            <div id="show-seconds">
              <h1>{this.props.secondsRemaining}</h1>
            </div>
          </div>
          : <h1>Your turn is over. When the next team is ready, hit start.</h1>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryTimer);
