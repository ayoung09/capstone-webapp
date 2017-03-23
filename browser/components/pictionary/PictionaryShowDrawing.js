import React, {Component} from 'react';
import { Layer, Stage, Line } from 'react-konva';
import socket from '../../socket';

import { RECEIVE_NEW_COORDINATES, CLEAR_CANVAS } from '../../../socketConstants'

class PictionaryShowDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDrawing: []
    }
  }

  componentDidMount() {
    socket.on(RECEIVE_NEW_COORDINATES, coordinates => {
      this.setState({currentDrawing: this.state.currentDrawing.concat(coordinates)})
    })

    socket.on(CLEAR_CANVAS, () => {
      this.setState({currentDrawing: []})
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
      </Stage>
    )
  }
}

export default PictionaryShowDrawing
