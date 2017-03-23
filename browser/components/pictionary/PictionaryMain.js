import React, { Component } from 'react';
import { connect } from 'react-redux';

import PictionaryScoreboard from './PictionaryScoreboard'
import PictionaryShowDrawing from './PictionaryShowDrawing'

import { setInitialScores } from '../../reducers/pictionary/pictionaryScoreboard'

const mapStateToProps = state => ({
  teams: state.pictionaryInitializeGame.teams
})


const mapDispatchToProps = dispatch => ({
  setInitialScores: (teams) => dispatch(setInitialScores(teams))
})

class PictionaryMain extends Component {

  componentWillMount() {
    this.props.setInitialScores(this.props.teams)
  }

  render() {
    return (
      <div>
        <PictionaryScoreboard
          team={this.props.teams[0]} />
        <PictionaryShowDrawing />
        {/*<PictionaryScoreboard
          team={this.props.teams[1]} />*/}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryMain)

//NOTE: will have conditional logic for rendering ShowDrawing; if game over have it say {TEAM X} won
