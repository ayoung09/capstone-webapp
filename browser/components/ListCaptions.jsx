import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import DrawkwardShowDrawing from './DrawkwardShowDrawing';
import { receivedSelectedPhrase, lookAtScoreboard } from '../../socketConstants';
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
    let phraseGuessesArray = Object.keys(this.props.phraseGuesses);

    //adding to scoreboard as each selected phrase is received
    socket.on(receivedSelectedPhrase, phraseObj => {
      this.props.addSelectedPhrase(phraseObj);
      if (phraseObj.selectedPhrase === originalPhrase) {
        this.props.add100(currentArtist);
        this.props.add100(phraseObj.id);
      }
      else if (phraseGuessesArray.includes(phraseObj.selectedPhrase)) {
        let phraseAuthor = this.props.phraseGuesses.filter(phraseGuessObj => {
          for (let phrase in phraseGuessObj) {
            if (phrase === phraseObj.selectedPhrase) {
              return phraseGuessObj[phrase];
            }
          }
        });
        this.props.add50(phraseAuthor);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPhraseGuesses.length === this.props.phraseGuesses.length) {
      socket.emit(lookAtScoreboard);
      browserHistory.push('/drawkward/scoreboard');
    }
  }

  componentWillUnmount() {
    socket.off(receivedSelectedPhrase);
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
