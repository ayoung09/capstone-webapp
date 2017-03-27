import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Header from './Header';
import { createRoom } from '../reducers/loginRoom';

const mapStateToProps = state => ({
  roomName: state.login.roomName,
});

const mapDispatchToProps = dispatch => ({
  createRoom: newRoomName => dispatch(createRoom(newRoomName)),
});

class Login extends Component {

  render() {
    return (
      <div id="login-container">
        <Header />
        <h2>a casual game for awkward artists</h2>
        <br />
        <div id="game-selection-box">
          <h1>Select your game below:</h1>
          <br />
          <Link to="/drawkward"><button className="btn-game">Drawkward</button></Link>
          <Link to="/pictionary"><button type="submit" className="btn-game">Pictionary</button></Link>
        </div>
        <img className="face-cloud-login" src="/images/face_cloud.png" />
        <img className="daisy-pig-login" src="/images/daisy_pig.png" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
