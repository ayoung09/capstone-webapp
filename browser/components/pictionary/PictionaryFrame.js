import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../../socket';


import { RECEIVE_NEW_TEAM, PICK_STARTING_TEAM, SET_ROUND_COUNT, SEND_NEW_WORD } from '../../../socketConstants'
import { addTeam } from '../../reducers/pictionary/pictionaryInitializeGame'
import { setRounds } from '../../reducers/pictionary/pictionaryRounds'
import PictionaryHeader from './PictionaryHeader';

const mapStateToProps = state => ({
  teams: state.pictionaryInitializeGame.teams,
  wordbank: state.pictionaryInitializeGame.wordbank,
})

const mapDispatchToProps = dispatch => ({
  addTeam: team => dispatch(addTeam(team)),
  setRounds: count => dispatch(setRounds(count))
})

class PictionaryFrame extends Component {

  componentDidMount() {
    socket.on(RECEIVE_NEW_TEAM, teamObj => {
      this.props.addTeam(teamObj)
    })

    socket.on(SET_ROUND_COUNT, playerCount => {
      this.props.setRounds(playerCount)
    })
  }

  componentWillUnmount() {
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
            <h2>Divide into two teams. Create a team name and avatar on your mobile app</h2>
            <h3>Each team will share one mobile device. When all the teams have signed in, hit START to begin your game</h3>
            <button className="btn-game" onClick={() => this.startGame()}>START</button>
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
