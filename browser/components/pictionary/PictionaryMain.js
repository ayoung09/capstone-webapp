import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';
import shuffle from 'shuffle-array';

import PictionaryScoreboard from './PictionaryScoreboard';
import PictionaryShowDrawing from './PictionaryShowDrawing';
import PictionaryTimer from './PictionaryTimer';

import { FETCH_NEXT_WORD, SEND_NEW_WORD } from '../../../socketConstants';

import { setInitialScores } from '../../reducers/pictionary/pictionaryScoreboard';

const mapStateToProps = state => ({
  teams: state.pictionaryInitializeGame.teams,
  wordbank: state.pictionaryInitializeGame.wordbank,
  turns: state.pictionaryRounds.turns
})

const mapDispatchToProps = dispatch => ({
  setInitialScores: (teams) => dispatch(setInitialScores(teams))
})

class PictionaryMain extends Component {

  componentDidMount() {
    socket.on(FETCH_NEXT_WORD, () => {
      socket.emit(SEND_NEW_WORD, this.props.wordbank.shift())
    })
  }

  componentWillMount() {
    this.props.setInitialScores(this.props.teams)
  }

  componentWillUnmount() {
    socket.off(FETCH_NEXT_WORD)
  }

  render() {
    return (
      <div>
        <div className="pictionary-frame">
          <PictionaryScoreboard
            team={this.props.teams[0]} />
          <PictionaryShowDrawing />
          <PictionaryScoreboard
            team={this.props.teams[1]} />
        </div>
        <PictionaryTimer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryMain)

//NOTE: will have conditional logic for rendering ShowDrawing; if game over have it say {TEAM X} won
