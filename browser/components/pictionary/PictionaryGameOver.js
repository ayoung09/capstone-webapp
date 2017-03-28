import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import socket from '../../socket';

import PictionaryTeamThumbnail from '../pictionary/PictionaryTeamThumbnail'

const mapStateToProps = state => ({
  teams: state.pictionaryInitializeGame.teams,
  scores: state.pictionaryScoreboard,
});

class PictionaryGameOver extends Component {
  findWinningTeam (teams) {
    if (this.props.scores[teams[0].name] > this.props.scores[teams[1].name]){
      return teams[0]
    } else {
      return teams[1]
    }
}

  render() {
    const winningTeam = this.findWinningTeam(this.props.teams);
    return (
      <div>
        {/*<h1 >GAME OVER</h1>*/}
        <h2 className="animated infinite pulse">Team {winningTeam.name} wins!</h2>
        <div className="user-thumbnail animated infinite pulse">
          <PictionaryTeamThumbnail team={winningTeam} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PictionaryGameOver);
