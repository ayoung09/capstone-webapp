import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../socket';

import Timer from './DrawkwardTimer';
import { addDrawing } from '../reducers/drawkwardRound';
import { receiveNewDrawing } from '../../socketConstants';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  allDrawings: state.drawkwardRound.allDrawings,
});

const mapDispatchToProps = dispatch => ({
  addDrawing: drawingObj => dispatch(addDrawing(drawingObj)),
});

class WaitForDrawings extends Component {

  componentDidMount() {
    socket.on(receiveNewDrawing, drawingObj => {
      console.log('browser received drawing: ', drawingObj);
      this.props.addDrawing(drawingObj);
    });
  }

  componentWillReceiveProps(nextProps) {
    const allUsersHaveSubmittedDrawings = () => {
      return Object.keys(this.props.users).length === nextProps.allDrawings.length;
    };
    if (allUsersHaveSubmittedDrawings()) {
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
        <Timer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitForDrawings);
