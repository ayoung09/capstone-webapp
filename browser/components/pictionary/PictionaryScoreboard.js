import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import socket from '../socket';

import { ADD_POINTS } from '../../../socketConstants'
import { addPoints } from '../../reducers/pictionary/pictionaryScoreboard'

const mapDispatchToProps = dispatch => ({
  addPoints: () => dispatch(addPoints())
})


//pass Team info as props so it can be reusable
class PictionaryScoreboard extends Component {

  componentDidMount() {
    socket.on(ADD_POINTS, () => {
      this.props.addPoints()
    })
  }

  componentDidUnmount() {
    socket.off(ADD_POINTS)
  }

  render() {
    return (
      <div className="user-thumbnail">
        <DrawkwardUserThumbnail
          userName={this.props.team.teamData.name}
          image={this.props.team.teamData.portrait}
        />
        <h2>{numOfPoints} points</h2>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(PictionaryScoreboard)
