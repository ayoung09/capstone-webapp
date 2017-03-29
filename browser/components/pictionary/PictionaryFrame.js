import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../../socket';


import { CREATE_NEW_ROOM, NEW_SOCKET_IN_ROOM, SEND_TO_PICTIONARY, RECEIVE_NEW_TEAM, PICK_STARTING_TEAM, SET_ROUND_COUNT, SEND_NEW_WORD } from '../../../socketConstants';
import { addTeam } from '../../reducers/pictionary/pictionaryInitializeGame';
import { setRounds } from '../../reducers/pictionary/pictionaryRounds';
import PictionaryHeader from './PictionaryHeader';
import PictionaryTeamThumbnail from './PictionaryTeamThumbnail'

const mapStateToProps = state => ({
  roomName: state.login.roomName,
  teams: state.pictionaryInitializeGame.teams,
  wordbank: state.pictionaryInitializeGame.wordbank,
});

const mapDispatchToProps = dispatch => ({
  addTeam: team => dispatch(addTeam(team)),
  setRounds: count => dispatch(setRounds(count))
});

class PictionaryFrame extends Component {

  componentDidMount() {
    socket.on(NEW_SOCKET_IN_ROOM, () => {
      socket.emit(SEND_TO_PICTIONARY, {room: this.props.roomName});
    });

    socket.on(RECEIVE_NEW_TEAM, teamObj => {
      this.props.addTeam(teamObj);
    });

    socket.on(SET_ROUND_COUNT, playerCount => {
      this.props.setRounds(playerCount);
    });
  }

  componentWillReceiveProps(nextProps) {
    socket.emit(CREATE_NEW_ROOM, {room: nextProps.roomName});
  }

  componentWillUnmount() {
    socket.off(NEW_SOCKET_IN_ROOM);
    socket.off(RECEIVE_NEW_TEAM);
    socket.off(SET_ROUND_COUNT);
  }

  startGame() {
    socket.emit(PICK_STARTING_TEAM, this.props.teams);
    socket.emit(SEND_NEW_WORD, this.props.wordbank.shift());
    browserHistory.push('/pictionary/main')
  }

  render() {
    return (
      <div id="outer-pictionary-frame">
        <PictionaryHeader />
        <br />
        <div className="pictionary-children">
          {this.props.children ? this.props.children :
          <div>
            <div className="room-form">
              <h2 className="room-form-subheader">Use the following room code to log in on your mobile device:</h2>
                <br />
                <h1 className="room-form-header">{this.props.roomName}</h1>
                <br />
              <h2>Divide into two teams. Create a team name and avatar on your mobile app</h2>
              <h3>Each team will share one mobile device. When all the teams have signed in, hit START to begin your game</h3>
              <div>
                <button className="btn-game" onClick={() => this.startGame()}>START</button>
              </div>
            </div>
            <div className="user-thumbnail-start">
              {this.props.teams[0] ? <PictionaryTeamThumbnail team={this.props.teams[0]} /> : null}
              {this.props.teams[1] ? <PictionaryTeamThumbnail team={this.props.teams[1]} /> : null}
            </div>
          </div>
        }
        </div>
        <img className="face-cloud-pictionary" src="/images/face_cloud.png" />
        <img className="daisy-pig-pictionary" src="/images/daisy_pig.png" />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryFrame)
