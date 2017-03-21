import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import socket from '../socket';

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
      this.props.addPhraseGuess(userObj.id, userObj.guessString);
    });
  }

  componentWillReceiveProps(nextProps) {
    let currentArtist = this.props.currentDrawing.id;
    let usersToReceive = Object.keys(this.props.users).filter(user => user !== currentArtist);

    if (!this.state.startCaptionSent) {
      socket.emit(sendStartCaption, usersToReceive);
      socket.emit(sendToArtist, currentArtist);
      this.setState({startCaptionSent: true});
    }

    if (nextProps.phraseGuesses.length === this.props.numOfUsers - 1) {
      let captionArray = nextProps.phraseGuesses.map(phraseObj => {
          return for (let phrase in phraseObj) {return phrase;}
      });
      socket.emit(receivedAllCaptions, {usersToReceive, captionArray});
      browserHistory.push('/drawkward/listCaptions');
    }
  }

  render() {
    return (
      <div>
        <h3>On your mobile device, enter an appropriate title for the drawing below</h3>
        <DrawkwardShowDrawing />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardWaitForCaptions);
