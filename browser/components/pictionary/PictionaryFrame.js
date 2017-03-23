import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../../socket';

import { startGame, RECEIVE_NEW_TEAM } from '../../../socketConstants'
import { addTeam } from '../../reducers/pictionary/pictionaryInitializeGame'

const mapDispatchToProps = dispatch => ({
  addTeam: team => dispatch(addTeam(team))
})

class PictionaryFrame extends Component {

  componentDidMount() {
    socket.on(RECEIVE_NEW_TEAM, teamObj => {
      this.props.addTeam(teamObj)
    })

    socket.on(startGame, () => {
      browserHistory.push('/pictionary/main')
    })
  }

  componentWillUnmount() {
    socket.off(RECEIVE_NEW_TEAM);
    socket.off(startGame);
  }

  render() {
    return (
      <div>
        {this.props.children ? this.props.children :
        <div>
          <h2>Divide into two teams. Create a team name and avatar on your mobile app</h2>
          <h3>Each team will share one mobile device. When all the teams have signed in, hit START to begin your game</h3>
        </div>
        }
      </div>
    )
  }

}

export default connect(null, mapDispatchToProps)(PictionaryFrame)
