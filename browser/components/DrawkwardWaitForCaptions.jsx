import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import socket from '../socket';
import shuffle from 'shuffle-array';

import DrawkwardShowDrawing from './DrawkwardShowDrawing';
import { setCurrentDrawing, addPhraseGuess } from '../reducers/drawkwardRound';
import { receiveNewGuess, sendToArtist, sendStartCaption, receivedAllCaptions } from '../../socketConstants';


const mapStateToProps = state => ({
  numOfUsers: Object.keys(state.drawkwardFrame.users).length,
  users: state.drawkwardFrame.users,
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
      startCaptionSent: false,
    };
  }

  componentDidMount() {
    this.props.setCurrentDrawing();

    socket.on(receiveNewGuess, userObj => {
      console.log('userobj', userObj)
      this.props.addPhraseGuess(userObj.id, userObj.guessString);
    });
  }

  componentWillUnmount() {
    socket.off(receiveNewGuess);
  }

  componentWillReceiveProps(nextProps) {
    let currentArtist = nextProps.currentDrawing.id;
    let usersToReceive = Object.keys(this.props.users).filter(user => user !== currentArtist);

    if (!this.state.startCaptionSent) {
      socket.emit(sendToArtist, currentArtist);
      socket.emit(sendStartCaption, usersToReceive);
      this.setState({startCaptionSent: true});
    }

    if (nextProps.phraseGuesses.length === this.props.numOfUsers - 1) {
      let captionArray = nextProps.phraseGuesses.map(phraseObj => {
          return Object.keys(phraseObj)[0];
      });
      captionArray.push(this.props.currentDrawing.drawingObj.phrase);
      captionArray = shuffle(captionArray);

      socket.emit(receivedAllCaptions, {usersToReceive, captionArray});
      browserHistory.push('/drawkward/listCaptions');
    }
  }

  render() {
    return (
      <div>
        <h3>On your mobile device, enter an appropriate title for the drawing below</h3>
        {Object.keys(this.props.currentDrawing).length > 0 ? <DrawkwardShowDrawing /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardWaitForCaptions);
