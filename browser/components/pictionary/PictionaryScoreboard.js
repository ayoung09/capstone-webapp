import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';

import { ADD_POINTS } from '../../../socketConstants'
import { addPoints } from '../../reducers/pictionary/pictionaryScoreboard'

const mapStateToProps = state => ({
  scores: state.PictionaryScoreboard
})

const mapDispatchToProps = dispatch => ({
  addPoints: () => dispatch(addPoints())
})

//pass Team info as props so it can be reusable
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
    const avatarCoordinates = this.props.team.portrait;
    const scores = this.props.scores[this.props.team.name]
    return (
      <div className="user-thumbnail">
        <DrawkwardUserThumbnail
          userName={teamName}
          image={avatarCoordinates}
        />
        <h2>{scores} points</h2>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictionaryScoreboard)
