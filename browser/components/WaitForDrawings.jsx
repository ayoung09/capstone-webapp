import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import socket from '../socket';

import { addDrawing } from '../reducers/drawkwardFrame'
import { receiveNewDrawing } from '../../socketConstants';

const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  drawing: state.drawkwardRound.allDrawings
});

const mapDispatchToProps = dispatch => ({
  addDrawing: (drawingObj) => dispatch(addDrawing(drawingObj))
})

class WaitForDrawings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on(receiveNewDrawing, drawingObj => {
      this.props.addDrawing(drawingObj)
    })
  }

  componentWillReceiveProps() {
    if (Object.keys(this.props.users).length === this.props.drawing.length) {
      browserHistory.push('/drawkward/showDrawing')
    }
  }

  render() {
    return (
      <div>
        <h2>Waiting for all users to submit their drawings.</h2>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitForDrawings)
