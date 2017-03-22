import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import shuffle from 'shuffle-array';
import socket from '../socket';

import { clearRound } from '../reducers/drawkwardRound';
import { nextRound } from '../reducers/drawkwardFrame';
import { seeNextDrawing, sendRandomPhrase, sendGameOver } from '../../socketConstants';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  scores: state.drawkwardScoreboard.scores,
  rounds: state.drawkwardFrame.rounds,
  allDrawings: state.drawkwardRound.allDrawings,
  phrases: state.drawkwardFrame.phrases,
});

const mapDispatchToProps = dispatch => ({
  clearRound: () => dispatch(clearRound()),
  nextRound: () => dispatch(nextRound()),
});


class DrawkwardScoreboard extends Component {

  componentDidMount() {
    this.props.clearRound();

    // Won't the server know we are finished with all the drawings?
    // WHy not emit a separate event and keep this logic server-side?
    socket.on(seeNextDrawing, () => {
      if (this.usersHaveNotSeenAllDrawings()) {
        // Should these urls be constants too?
        browserHistory.push('/drawkward/waitForCaptions');
      }
      else if (this.roundsStillRemaining()) {
        this.props.nextRound();
        this.emitRandomPhrasesToMobile();
        browserHistory.push('/drawkward/waitForDrawings');
      }
      else {
        socket.emit(sendGameOver);
      }
    });
  }

  componentWillUnmount() {
    socket.off(seeNextDrawing);
  }

  usersHaveNotSeenAllDrawings() {
    return this.props.allDrawings.length > 0;
  }

  roundsStillRemaining() {
    return this.props.rounds > 0;
  }

  emitRandomPhrasesToMobile() {
    let numOfUsers = Object.keys(this.props.users).length;
    let randomPhrases = shuffle.pick(this.props.phrases, {'picks': numOfUsers});
    let userIds = Object.keys(this.props.users);
    socket.emit(sendRandomPhrase, {randomPhrases, userIds});
  }

  render() {

    return (
      <div>
        <p>Still figuring out how to render out scores...</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardScoreboard);
