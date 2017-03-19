import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import socket from '../socket';

import DrawkwardShowDrawing from './DrawkwardShowDrawing';
import { setCurrentDrawing, addPhraseGuess } from '../reducers/drawkwardRound';
import { receiveNewGuess } from '../../socketConstants';


const mapStateToProps = state => ({
  numOfUsers: Object.keys(state.drawkwardFrame.users).length,
  currentDrawing: state.drawkwardRound.currentDrawing,
  phraseGuesses: state.drawkwardRound.phraseGuesses,
});


const mapDispatchToProps = dispatch => ({
  setCurrentDrawing: () => dispatch(setCurrentDrawing()),
  addPhraseGuess: (socketId, guessStr) => dispatch(addPhraseGuess(socketId, guessStr)),
});


class DrawkwardWaitingForCaptions extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.setCurrentDrawing();

    socket.on(receiveNewGuess, userObj => {
      this.props.addPhraseGuess(userObj.id, userObj.guessString);
      if (this.props.phraseGuesses.length === numOfUsers - 2) {
        browserHistory.push('/drawkward/listCaptions');
      }
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardWaitingForCaptions);
