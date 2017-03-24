import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../socket';

import DrawkwardUserThumbnail from './DrawkwardUserThumbnail';
import { addUser, setRounds, receiveAllPhrases } from '../reducers/drawkwardFrame';
import { setInitialScores } from '../reducers/drawkwardScoreboard';
import { CREATE_NEW_ROOM, NEW_SOCKET_IN_ROOM, SEND_TO_DRAWKWARD, receiveNewUser, startGame, sendRandomPhrase } from '../../socketConstants';


const mapStateToProps = state => ({
  roomName: state.login.roomName,
  users: state.drawkwardFrame.users,
  phrases: state.drawkwardFrame.phrases,
  rounds: state.drawkwardFrame.rounds,
});

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(addUser(user)),
  setRounds: (numOfUsers) => dispatch(setRounds(numOfUsers)),
  setInitialScores: usersArray => dispatch(setInitialScores(usersArray)),
  resetAllPhrases: phrasesArray => dispatch(receiveAllPhrases(phrasesArray)),
});


class DrawkwardFrame extends Component {

  componentDidMount() {
    socket.on(NEW_SOCKET_IN_ROOM, () => {
      socket.emit(SEND_TO_DRAWKWARD, {room: this.props.roomName});
    });

    socket.on(receiveNewUser, userObj => {
      this.props.addUser(userObj);
    });

    socket.on(startGame, () => {
      this.emitRandomPhrasesToMobile();
      this.props.setInitialScores(Object.keys(this.props.users));
      this.props.setRounds(Object.keys(this.props.users).length);
      browserHistory.push('/drawkward/waitForDrawings');
    });
  }

  componentWillReceiveProps(nextProps) {
    socket.emit(CREATE_NEW_ROOM, {room: nextProps.roomName});
  }

  componentWillUnmount() {
    socket.off(receiveNewUser);
    socket.off(startGame);
  }

  emitRandomPhrasesToMobile() {
    let numOfUsers = Object.keys(this.props.users).length;
    let randomPhrases = [];
    for (let n = 0; n < numOfUsers; n++) {
      randomPhrases.push(this.props.phrases.shift());
    }
    let userIds = Object.keys(this.props.users);
    socket.emit(sendRandomPhrase, {randomPhrases, userIds});

    this.props.resetAllPhrases(this.props.phrases);
  }

  render() {
    const usersArray = Object.keys(this.props.users);
    let numOfUsers = usersArray.length;

    return (
      <div>
        {this.props.children ? this.props.children :
          <div>
            <div className="room-form">
              <h2>Use the following room code to log in on your mobile device:</h2>
              <br />
              <h1 className="room-form-header">{this.props.roomName}</h1>
              <br />
              <h2>Create a username and portrait in your mobile app</h2>
              <h2>When all users have signed in, hit START to begin your game</h2>
            </div>
          </div>
        }
        {!this.props.children && numOfUsers > 0 ? usersArray.map(socketId => {
            const nameToDisplay = this.props.users[socketId].username;
            const imageArray = this.props.users[socketId].portrait;
            return (
              <div key={socketId} className="user-thumbnail">
                <DrawkwardUserThumbnail userName={nameToDisplay} image={imageArray} />
              </div>
            );
        }) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardFrame);
