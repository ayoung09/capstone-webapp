import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import DrawkwardShowDrawing from './DrawkwardShowDrawing';
import { receivedSelectedPhrase } from '../../socketConstants';
import { addSelectedPhrase } from '../reducers/drawkwardRound';
import { add50, add100 } from '../reducers/drawkwardScoreboard';



const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  currentDrawing: state.drawkwardRound.currentDrawing,
  drawing: state.drawkwardRound.currentDrawing.image,
  originalPhrase: state.drawkwardRound.currentDrawing.phrase,
  phraseGuesses: state.drawkwardRound.phraseGuesses,
  selectedPhraseGuesses: state.drawkwardRound.selectedPhraseGuesses,
  scores: state.drawkwardScoreboard.scores,
});


const mapDispatchToProps = dispatch => ({
  addSelectedPhrase: phraseObj => dispatch(addSelectedPhrase(phraseObj)),
  add50: socketId => dispatch(add50(socketId)),
  add100: socketId => dispatch(add100(socketId)),
});


class ListCaptions extends Component {
  componentDidMount() {
    let originalPhrase = this.props.originalPhrase;
    let currentArtist = Object.keys(this.props.currentDrawing)[0];

    socket.on(receivedSelectedPhrase, phraseObj => {
      this.props.addSelectedPhrase(phraseObj);
      if (phraseObj.selectedPhrase === originalPhrase) {
        //continue here
      }
    });
  }

  componentWillReceiveProps() {
    if (this.props.selectedPhraseGuesses.length === this.props.phraseGuesses.length) {

      //calculate scores
      browserHistory.push('/drawkward/scoreboard');
    }
  }

  render() {
    return (
      <div>
        <DrawkwardShowDrawing />
        {Object.keys(this.props.phraseGuesses).map(phraseString => {
          return (
            <p>{phraseString}</p>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCaptions);
