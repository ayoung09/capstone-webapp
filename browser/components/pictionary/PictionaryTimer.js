import React, { Component } from 'react';
import socket from '../../socket';

import {connect} from 'react-redux';
import { setTimer, countdown } from '../../reducers/timer';
import { nextTurn } from '../../reducers/pictionary/pictionaryRounds'
import { TIMER_DONE, END_GAME, START_NEXT_TURN } from '../../../socketConstants';

const mapStateToProps = state => ({
  secondsRemaining: state.timer.secondsRemaining,
  turnsRemaining: state.pictionaryRounds.turns
});

const mapDispatchToProps = dispatch => ({
  setTimer: startingSeconds => dispatch(setTimer(startingSeconds)),
  countdown: () => dispatch(countdown()),
  nextTurn: () => dispatch(nextTurn())
});

class PictionaryTimer extends Component {

  componentWillMount() {
    this.props.setTimer(10);
  }

  componentDidMount() {
    this.interval = setInterval(this.props.countdown, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secondsRemaining === 0) {
      console.log('will receive props seconds remaining')
      socket.emit(TIMER_DONE);
      clearInterval(this.interval);
    }

    if (nextProps.turnsRemaining < 0) {
      console.log('will receive props turns remaining')
      socket.emit(END_GAME)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startGame() {
    this.props.nextTurn();
    this.props.setTimer(10);
    this.interval = setInterval(this.props.countdown, 1000);
    socket.emit(START_NEXT_TURN);
    // socket.emit(END_TURN_SERVER)
  }

  render() {
    return (
      <div id="countdown-timer">
        {this.props.secondsRemaining > 0 ?
          <div>
            <div id="show-seconds">
              <h1 id="pictionary-seconds-countdown">{this.props.secondsRemaining}</h1>
            </div>
          </div>
          : <div>
              <h1>Your turn is over. When the next team is ready, hit start.</h1>
              <button className="btn-game" onClick={() => this.startGame()}>START</button>
            </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryTimer);
