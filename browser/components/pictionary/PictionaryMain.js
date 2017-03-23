import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../../socket';

import PictionaryScoreboard from './PictionaryScoreboard'
import PictionaryShowDrawing from './PictionaryShowDrawing'

const mapStateToProps = state => ({
  teams: state.pictionaryInitializeGame.teams
})

class PictionaryMain extends Component {

  render() {
    return (
      <div>
        <PictionaryScoreboard
          teams={this.props.teams[0]}
        />
        <PictionaryShowDrawing />
        <PictionaryScoreboard
          teams={this.props.teams[1]}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(PictionaryMain)

//NOTE: will have conditional logic for rendering ShowDrawing; if game over have it say {TEAM X} won
