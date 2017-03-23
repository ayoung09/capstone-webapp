import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';

import { ADD_POINTS } from '../../../socketConstants'
import { addPoints } from '../../reducers/pictionary/pictionaryScoreboard'

import PictionaryTeamThumbnail from '../pictionary/PictionaryTeamThumbnail'

const mapStateToProps = state => ({
  scores: state.pictionaryScoreboard.scores
})

const mapDispatchToProps = dispatch => ({
  addPoints: () => dispatch(addPoints())
})

class PictionaryScoreboard extends Component {

  componentDidMount() {
    socket.on(ADD_POINTS, () => {
      this.props.addPoints(this.props.team.name)
    })
  }

  componentWillUnmount() {
    socket.off(ADD_POINTS)
  }

  render() {
    const teamName = this.props.team.name;
    const avatarCoordinates = this.props.team.portrait; //[]
    const scores = this.props.scores[teamName];

    return (
      <div className="user-thumbnail">
        <PictionaryTeamThumbnail team={this.props.team} />
        <h2>{scores} points</h2>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryScoreboard)
