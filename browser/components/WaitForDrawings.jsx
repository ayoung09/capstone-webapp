import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../socket';

import { addDrawing } from '../reducers/drawkwardFrame';
import { setInitialScores } from '../reducers/drawkwardScoreboard';
import { receiveNewDrawing } from '../../socketConstants';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  allDrawings: state.drawkwardRound.allDrawings
});

const mapDispatchToProps = dispatch => ({
  setInitialScores: usersArray => dispatch(setInitialScores(usersArray)),
  addDrawing: drawingObj => dispatch(addDrawing(drawingObj)),
});

class WaitForDrawings extends Component {

  componentDidMount() {
    this.props.setInitialScores(Object.keys(this.props.users));

    socket.on(receiveNewDrawing, drawingObj => {
      this.props.addDrawing(drawingObj);
    });
  }

  componentWillReceiveProps() {
    if (Object.keys(this.props.users).length === this.props.allDrawings.length) {
      browserHistory.push('/drawkward/waitForCaptions');
    }
  }

  componentWillUnmount() {
    socket.off(receiveNewDrawing);
  }

  render () {
    return (
      <div>
        <h2>Waiting for all users to submit their drawings.</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitForDrawings);
