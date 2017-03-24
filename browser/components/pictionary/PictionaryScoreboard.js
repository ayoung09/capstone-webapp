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
    socket.on(ADD_POINTS, () => {
      this.props.addPoints(this.props.team.name)
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('new props', nextProps.scores);
  }

  componentWillUnmount() {
    socket.off(ADD_POINTS)
  }

  render() {
    // const teamName = this.props.team.name;
    console.log('state', this.props)
    return (
      <div className="user-thumbnail">
        <PictionaryTeamThumbnail team={this.props.team} />
        <h2>{this.props.scores[this.props.team.name]} points</h2>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryScoreboard)
