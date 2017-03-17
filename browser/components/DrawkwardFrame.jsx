import React, { Component } from 'react';
import socket from '../socket';

import { connect } from 'react-redux';
import { addUser, setRounds, nextRound } from '../reducers/drawkwardFrame';
import { addDrawing, setCurrentDrawing, addPhraseGuess, clearRound } from '../reducers/drawkwardRound';

import { receiveNewUser, startGame, receiveNewDrawing, receiveNewGuess, sendRandomPhrase } from '../../socketConstants';


const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  phrases: state.drawkwardFrame.phrases,
  rounds: state.drawkwardFrame.rounds,
  currentDrawing: state.drawkwardRound.currentDrawing,
  phraseGuesses: state.drawkwardRound.phraseGuesses,
  allDrawings: state.drawkwardRound.allDrawings,
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



class DrawkwardFrame extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on(receiveNewUser, userObj => {
      this.props.addUser(userObj);
    });

    socket.on(startGame, () => {
      //send random phrases to users;
    });

    // socket.on(receiveNewDrawing, drawingObj)
    socket.on('receiveCoordinatesFromIOS', data => {
    console.log('Received data from socket: ', data);
    });
  }

  componentWillUnmount() {
    //FILL THIS IN
  }


  // emitToSocket() {
  //     socket.emit('talk to mobile', socket.id);
  // }


  render() {
    return (
      <div>
        <h2>Create a username and portrait in your mobile app</h2>
        <h4>When all users have signed in, hit START to begin your game</h4>
        <button>Emit</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardFrame);
