import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';

import { ADD_POINTS } from '../../../socketConstants'
import { addPoints } from '../../reducers/pictionary/pictionaryScoreboard'

import PictionaryTeamThumbnail from '../pictionary/PictionaryTeamThumbnail'

const mapStateToProps = state => ({
  scores: state.pictionaryScoreboard
})

const mapDispatchToProps = dispatch => ({
  addPoints: (teamName) => dispatch(addPoints(teamName))
})

class PictionaryScoreboard extends Component {

  componentDidMount() {
    socket.on(ADD_POINTS, teamName => {
      if (teamName === this.props.team.name) {
        this.props.addPoints(this.props.team.name)
      }
    })
  }

  componentWillUnmount() {
    socket.off(ADD_POINTS)
  }

  componentWillReceiveProps(nextProps) {
    console.log('new props', nextProps)
  }

  render() {
    return (
      <div className="user-thumbnail">
        <PictionaryTeamThumbnail team={this.props.team} />
        <h2>{this.props.scores[this.props.team.name]} points</h2>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryScoreboard)
