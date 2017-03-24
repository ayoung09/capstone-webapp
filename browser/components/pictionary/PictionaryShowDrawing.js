import React, {Component} from 'react';
import { Layer, Stage, Line } from 'react-konva';
import socket from '../../socket';

import { START_NEW_LINE, RECEIVE_NEW_COORDINATES, CLEAR_CANVAS } from '../../../socketConstants'


class PictionaryShowDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDrawing: [],
      currentLine: []
    }
  }

  componentDidMount() {
    socket.on(START_NEW_LINE, () => {
      this.state.currentDrawing.push(this.state.currentLine)
      this.setState({currentLine: []})
    })

    socket.on(RECEIVE_NEW_COORDINATES, coordinates => {
      this.setState({currentLine: this.state.currentLine.concat(coordinates)})
    })

    socket.on(CLEAR_CANVAS, () => {
      this.setState({currentDrawing: [], currentLine: []})
    })
  }

  componentWillUnmount() {
    socket.off(RECEIVE_NEW_COORDINATES);
    socket.off(CLEAR_CANVAS);
  }

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          {this.state.currentDrawing.map((line, i) => {
            return (
              <Line
                key={i}
                points={line}
                stroke={'black'}
                strokeWidth={3}
              />
            )
          })}
          </Layer>
          <Layer>
          <Line
            points={this.state.currentLine} stroke={'black'} strokeWidth={3}
          />
        </Layer>
      </Stage>
    )
  }
}

export default PictionaryShowDrawing
