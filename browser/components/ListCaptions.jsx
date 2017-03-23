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
  originalPhrase: state.drawkwardRound.currentDrawing.drawingObj.phrase,
  phraseGuesses: state.drawkwardRound.phraseGuesses,
  selectedPhraseGuesses: state.drawkwardRound.selectedPhraseGuesses,
  scores: state.drawkwardScoreboard.scores,
});


const mapDispatchToProps = dispatch => ({
  addSelectedPhrase: phraseObj => dispatch(addSelectedPhrase(phraseObj)),
  add50Points: socketId => dispatch(add50(socketId)),
  add100Points: socketId => dispatch(add100(socketId)),
});


class ListCaptions extends Component {
  componentDidMount() {
    let currentArtist = this.props.currentDrawing.id;

    //adding to scoreboard as each selected phrase is received
    socket.on(receivedSelectedPhrase, phraseObj => {
      this.props.addSelectedPhrase(phraseObj);
      if (this.userSelectedOriginalPhrase(phraseObj)) {
        this.props.add100Points(currentArtist); //not working
        this.props.add100Points(phraseObj.id);
      }
      else if (this.userSelectedAnotherUsersPhrase(phraseObj)) {
        let phraseAuthor = this.findUserWhoCreatedPhrase(phraseObj);
        this.props.add50Points(phraseAuthor);
      }
    });
  }

  userSelectedOriginalPhrase(phraseObj) {
    return phraseObj.selectedPhrase === this.props.originalPhrase;
  }

  userSelectedAnotherUsersPhrase(phraseObj) {
    let phraseGuessesArray = this.props.phraseGuesses.map(phraseGuessObj => {
      for (let phrase in phraseGuessObj) {
        return phrase;
      }
    });
    return phraseGuessesArray.includes(phraseObj.selectedPhrase);
  }

  findUserWhoCreatedPhrase(phraseObj) {
    let phraseKey;
    const userWhoCreatedPhrase = this.props.phraseGuesses.filter(phraseGuessObj => {
      for (let phrase in phraseGuessObj) {
        if (phrase === phraseObj.selectedPhrase) {
          phraseKey = phrase;
          return phraseGuessObj[phrase];
        }
      }
    });
    return userWhoCreatedPhrase[0][phraseKey];
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
