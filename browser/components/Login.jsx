import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { createRoom } from '../reducers/loginRoom';

const mapStateToProps = state => ({
  roomName: state.login.roomName,
});

const mapDispatchToProps = dispatch => ({
  createRoom: newRoomName => dispatch(createRoom(newRoomName)),
});

class Login extends Component {

  componentWillMount() {
    const randomRoomName = this.generateRandomRoomName();
    this.props.createRoom(randomRoomName);
  }

  generateRandomRoomName() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const roomNameLength = 4;
    let roomName = '';
    while (roomName.length < roomNameLength) {
      let randomLetter = alphabet[Math.ceil(Math.random() * 25)];
      roomName += randomLetter;
    }
    return roomName;
  }

  onGamePress(e) {
    console.log('this is in onGamePress: ', this.props.roomName, 'and this is in params: ', e.target);
  }

  render() {
    console.log('this is roomName: ', this.props.roomName);
    return (
      <div className="room-form">
        <h2>Use the following room code to log in on your mobile device:</h2>
        <br />
        <h1 className="room-form-header">{this.props.roomName}</h1>
        <br />
        <h2>Select your game below:</h2>
        <br />
        <Link to="/drawkward"><button onClick={this.onGamePress}className="btn-game">Drawkward</button></Link>
        <Link to="/pictionary"><button type="submit" onClick={this.onGamePress}className="btn-game">Pictionary</button></Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
