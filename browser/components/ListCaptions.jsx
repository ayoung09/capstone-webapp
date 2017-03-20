import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import DrawkwardShowDrawing from './DrawkwardShowDrawing';
import { receivedSelectedPhrase } from '../../socketConstants';
import { addSelectedPhrase } from '../reducers/drawkwardRound';


const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  currentDrawing: state.drawkwardRound.currentDrawing,
  drawing: state.drawkwardRound.currentDrawing.image,
  originalPhrase: state.drawkwardRound.currentDrawing.phrase,
  guesses: state.drawkwardRound.phraseGuesses,
  selectedPhraseGuesses: state.drawkwardRound.selectedPhraseGuesses,
});


const mapDispatchToProps = dispatch => ({
  addSelectedPhrase: (phraseObj) => dispatch(addSelectedPhrase(phraseObj))
});


class ListCaptions extends Component {
  componentDidMount() {
    socket.on(receivedSelectedPhrase, phraseObj => {
      this.props.addSelectedPhrase(phraseObj);
    });
  }

  componentWillReceiveProps() {
    let currentArtist = Object.keys(this.props.currentDrawing);

    if (this.props.selectedPhraseGuesses.length === this.props.numOfUsers - 1) {
      let usersToReceive = Object.keys(this.props.users).filter(user => user !== currentArtist);

      let captionArray = this.props.phraseGuesses.map(phraseObj => {
          for (let key in phraseObj) {
            return phraseObj[key];
        }
      });
    if (Object.keys(this.props.users).length-1 === this.props.guesses.length) {
      browserHistory.push('/drawkward/scoreboard');
    }
  }

  render() {
    return (
      <div>
        <DrawkwardShowDrawing />
        {this.props.guesses.map(user => {
          return (
            <p>{user.id}</p>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCaptions);
