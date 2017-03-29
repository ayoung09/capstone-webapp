import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import shuffle from 'shuffle-array';
import socket from '../socket';

import DrawkwardShowDrawing from './DrawkwardShowDrawing';
import { setCurrentDrawing, addPhraseGuess } from '../reducers/drawkwardRound';
import { receiveNewGuess, sendToArtist, sendStartCaption, receivedAllCaptions } from '../../socketConstants';


const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  numOfUsers: Object.keys(state.drawkwardFrame.users).length,
  currentDrawing: state.drawkwardRound.currentDrawing,
  phraseGuesses: state.drawkwardRound.phraseGuesses,
});


const mapDispatchToProps = dispatch => ({
  setCurrentDrawing: () => dispatch(setCurrentDrawing()),
  addPhraseGuess: (socketId, guessStr) => dispatch(addPhraseGuess(socketId, guessStr)),
});


class DrawkwardWaitForCaptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCaptionEmitted: false,
    };
  }

  componentDidMount() {
    this.props.setCurrentDrawing();

    socket.on(receiveNewGuess, userObj => {
      this.props.addPhraseGuess(userObj.id, userObj.guessString);
    });
  }

  componentWillReceiveProps(nextProps) {
    let currentArtist = nextProps.currentDrawing.id;
    let usersToReceive = Object.keys(this.props.users).filter(user => user !== currentArtist);

    if (!this.state.startCaptionEmitted) {
      socket.emit(sendToArtist, currentArtist);
      socket.emit(sendStartCaption, usersToReceive);
      this.setState({startCaptionEmitted: true});
    }

    const allUsersHaveSubmittedPhraseGuesses = () => {
      return nextProps.phraseGuesses.length === this.props.numOfUsers - 1;
    };

    const includeOriginalPhrase = (captionGuessesArr) => {
      captionGuessesArr.push(this.props.currentDrawing.drawingObj.phrase);
      return captionGuessesArr;
    };

    const buildAndShuffleCaptionArr = () => {
      let captionGuessesArray = nextProps.phraseGuesses.map(phraseObj => {
          return Object.keys(phraseObj)[0];
      });
      let includingOriginalPhrase = includeOriginalPhrase(captionGuessesArray);
      shuffle(includingOriginalPhrase);
      return includingOriginalPhrase;
    };

    if (allUsersHaveSubmittedPhraseGuesses()) {
      let captionArray = buildAndShuffleCaptionArr();
      socket.emit(receivedAllCaptions, {usersToReceive, captionArray});
      browserHistory.push('/drawkward/listCaptions');
    }
  }

  componentWillUnmount() {
    socket.off(receiveNewGuess);
  }

  render() {
    return (
      <div className="outer-show-drawing">
        <h2>On your mobile device, enter an appropriate title for the drawing below</h2>
        {Object.keys(this.props.currentDrawing).length > 0 ? <DrawkwardShowDrawing /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardWaitForCaptions);
