import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';

import DrawkwardShowDrawing from './DrawkwardShowDrawing'
import { receivedSelectedPhrase } from '../../socketConstants'
import { addSelectedPhrase } from '../reducers/drawkwardRound'

const mapStateToProps = state => ({
  drawing: state.drawkwardRound.currentDrawing.image,
  originalPhrase: state.drawkwardRound.currentDrawing.phrase,
  guesses: state.drawkwardRound.phraseGuesses,
  users: state.drawkwardFrame.users
});

const mapDispatchToProps = dispatch => ({
  addSelectedPhrase: (phraseObj) => dispatch(addSelectedPhrase(phraseObj))
})

class ListCaptions extends Component {
  componentDidMount() {
    socket.on(receivedSelectedPhrase, phraseObj => {
      this.props.addSelectedPhrase(phraseObj)
    })
  }

  componentWillReceiveProps() {
    if (Object.keys(this.props.users).length-1 === this.props.guesses.length) {
      browserHistory.push('/drawkward/scoreboard')
    }
  }

  render() {
    return (
      <div>
        <DrawkwardShowDrawing />
        {this.props.guesses.map(user => {
          return (
            <p>{user.id}</p>
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCaptions)
