import React, { Component } from 'react';

import {connect} from 'react-redux';
import {countdown} from '../reducers/timer';

const mapStateToProps = state => ({
  secondsRemaining: state.timer.secondsRemaining
});

const mapDispatchToProps = dispatch => ({
  countdown: () => dispatch(countdown())
});

class Timer extends Component {

  componentDidMount() {
    this.interval = setInterval(this.props.countdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log('these are secondsRemaining: ', this.props.secondsRemaining);
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

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
