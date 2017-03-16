import React from 'react';
import socket from '../socket';

import { connect } from 'react-redux';
import { addUser, setRounds, nextRound } from '../reducers/drawkwardFrame';
import { addDrawing, setCurrentDrawing, addPhraseGuess, clearRound } from '../reducers/drawkwardRound';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  phrases: state.drawkwardFrame.phrases,
});

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(addUser(user)),
  setRounds: (numOfUsers) => dispatch(setRounds(numOfUsers)),
  addDrawing: (drawingObj) => dispatch(addDrawing(drawingObj)),
  setCurrentDrawing: () => dispatch(setCurrentDrawing()),
  addPhraseGuess: (socketId, userObj) => dispatch(addPhraseGuess(socketId, userObj)),
  initializeRound: () => {
    dispatch(nextRound());
    dispatch(setCurrentDrawing());
  },
  clearRound: () => dispatch(clearRound()),
});

const emitToSocket = () => {
    socket.emit('talk to mobile', socket.id);
  };

socket.on('receiveCoordinatesFromIOS', data => {
console.log('Received data from socket: ', data);
});

const DrawkwardFrame = ({ users, phrases, addUser, setRounds, addDrawing, setCurrentDrawing, addPhraseGuess, initializeRound, clearRound }) =>
  {

  return (
    <div>
      <h2>Create a username and portrait in your mobile app</h2>
      <h4>When all users have signed in, hit START to begin your game</h4>
      <button onClick={emitToSocket}>Emit</button>
    </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardFrame);
