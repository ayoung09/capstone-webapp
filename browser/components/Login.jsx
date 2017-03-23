import React, { Component } from 'react';
import { Link } from 'react-router';

//const mapStateToProps =

class Login extends Component {
  constructor() {
    super();
    this.state = {
      roomName: '',
    };
    this.onGamePress = this.onGamePress.bind(this);
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
    console.log('this is roomName: ', this.generateRandomRoomName());
    return (
      <div>
        <h2>Create a name for your Game Room and then select a Game to play</h2>
        <form>
          <h1 className="room-form-header">{this.props.roomName}</h1>
          <br />
          <Link to="/drawkward"><button onClick={this.onGamePress}className="btn-game">Drawkward</button></Link>
          <Link to="/pictionary"><button type="submit" onClick={this.onGamePress}className="btn-game">Pictionary</button></Link>
        </form>
      </div>
    );
  }
}

export default Login;
