import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import shuffle from 'shuffle-array';
import socket from '../socket';

import DrawkwardUserThumbnail from './DrawkwardUserThumbnail';
import { clearRound } from '../reducers/drawkwardRound';
import { nextRound } from '../reducers/drawkwardFrame';
import { seeNextDrawing, sendRandomPhrase, sendGameOver } from '../../socketConstants';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  scores: state.drawkwardScoreboard.scores,
  rounds: state.drawkwardFrame.rounds,
  allDrawings: state.drawkwardRound.allDrawings,
  phrases: state.drawkwardFrame.phrases,
  originalPhrase: state.drawkwardRound.currentDrawing.drawingObj.phrase,
});

const mapDispatchToProps = dispatch => ({
  clearRound: () => dispatch(clearRound()),
  nextRound: () => dispatch(nextRound()),
});


class DrawkwardScoreboard extends Component {

  componentDidMount() {
    socket.on(seeNextDrawing, () => {
      if (this.usersHaveNotSeenAllDrawings()) {
        browserHistory.push('/drawkward/waitForCaptions');
      }
      else if (this.roundsStillRemaining()) {
        this.props.nextRound();
        this.emitRandomPhrasesToMobile();
        browserHistory.push('/drawkward/waitForDrawings');
      }
      else {
        socket.emit(sendGameOver);
        browserHistory.push('/drawkward/winner');
      }
    });
  }

  componentWillUnmount() {
    this.props.clearRound();
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
    const usersObj = this.props.users;
    const usersArray = Object.keys(usersObj);
    const scoresObj = this.props.scores;

    return (
     <div>
      <div className="original-phrase">
        <h2 className="original-phrase-title">Original Phrase: </h2>
          <p className="original-phrase-text">{this.props.originalPhrase}</p>
      </div>
      <h2>Scoreboard:</h2>
        {usersArray.map(socketId => {
          let nameToDisplay = usersObj[socketId].username;
          let imageArray = usersObj[socketId].portrait;
          let numOfPoints = scoresObj[socketId];
          return (
            <div key={socketId} className="user-thumbnail">
              <DrawkwardUserThumbnail
                userName={nameToDisplay}
                image={imageArray}
              />
              <h2>{numOfPoints} points</h2>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardScoreboard);
