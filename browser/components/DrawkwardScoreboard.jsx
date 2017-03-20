import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import socket from '../socket';

import { clearRound } from '../reducers/drawkwardRound';
import { nextRound } from '../reducers/drawkwardFrame';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  scores: state.drawkwardScoreboard.scores,
  rounds: state.drawkwardFrame.rounds,
  allDrawings: state.drawkwardRound.allDrawings,
});

const mapDispatchToProps = dispatch => ({
  clearRound: () => dispatch(clearRound()),
  nextRound: () => dispatch(nextRound()),
});


class DrawkwardScoreboard extends Component {

  componentDidMount() {
    this.props.clearRound();

    socket.on(seeNextDrawing, () => {
      if (this.props.allDrawings.length) {
        browserHistory.push('/drawkward/waitForCaptions');
      } else if (this.props.rounds > 0) {
        this.props.nextRound();
        browserHistory.push('/drawkward/waitForDrawings');
      } else {
        socket.broadcast.emit(sendGameOver);
      }
    });
  }


  render() {
    return (
      <div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardScoreboard);
