import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../socket';

import { addDrawing } from '../reducers/drawkwardRound';
import { setInitialScores } from '../reducers/drawkwardScoreboard';
import { receiveNewDrawing } from '../../socketConstants';

const mapStateToProps = state => {
  const newState =  {users: state.drawkwardFrame.users,
  allDrawings: state.drawkwardRound.allDrawings};
  console.log('new state', newState)
  return newState;
};

const mapDispatchToProps = dispatch => ({
  setInitialScores: usersArray => dispatch(setInitialScores(usersArray)),
  addDrawing: drawingObj => dispatch(addDrawing(drawingObj)),
});

class WaitForDrawings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setInitialScores(Object.keys(this.props.users));

    socket.on(receiveNewDrawing, drawingObj => {
      this.props.addDrawing(drawingObj);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);
    console.log('users length', Object.keys(this.props.users).length);
    console.log('drawings length', this.props.allDrawings.length);
    if (Object.keys(this.props.users).length === nextProps.allDrawings.length) {
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
