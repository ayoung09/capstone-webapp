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

  render() {
    return (
      <div>
        <h2>Select your game below:</h2>
        <br />
        <Link to="/drawkward"><button className="btn-game">Drawkward</button></Link>
        <Link to="/pictionary"><button type="submit" className="btn-game">Pictionary</button></Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
