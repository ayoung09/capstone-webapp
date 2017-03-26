import React, { Component } from 'react';
import socket from '../socket';

import {connect} from 'react-redux';
import { setTimer, countdown } from '../reducers/timer';
import { TIME_IS_UP } from '../../socketConstants';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  secondsRemaining: state.timer.secondsRemaining,
  allDrawings: state.drawkwardRound.allDrawings,
});

const mapDispatchToProps = dispatch => ({
  setTimer: startingSeconds => dispatch(setTimer(startingSeconds)),
  countdown: () => dispatch(countdown()),
});

class DrawkwardTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forcedToSubmit: false,
    };
  }

  componentWillMount() {
    this.props.setTimer(60);
  }

  componentDidMount() {
    this.interval = setInterval(this.props.countdown, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secondsRemaining === 0 && !nextProps.forcedToSubmit) {
      this.setState({forcedToSubmit: true});
      clearInterval(this.interval);
      const usersWhoHaveSubmitted = nextProps.allDrawings.map(drawingObj => drawingObj.id);
      const usersToForceSubmit = this.findUsersWhoHaveNotSubmittedDrawings(usersWhoHaveSubmitted);
      socket.emit(TIME_IS_UP, usersToForceSubmit);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  findUsersWhoHaveNotSubmittedDrawings(usersWhoHaveSubmitted) {
    const usersArray = Object.keys(this.props.users);
    return usersArray.filter(socketId => !usersWhoHaveSubmitted.includes(socketId));
  }

  render() {
    return (
      <div id="countdown-timer">
        {this.props.secondsRemaining > 0 ?
          <div>
            <h2>Finish your drawings before time runs out!</h2>
            <div id="show-seconds">
              <h1 id="seconds-countdown">{this.props.secondsRemaining}</h1>
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
