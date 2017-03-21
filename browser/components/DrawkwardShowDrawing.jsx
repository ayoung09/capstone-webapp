import React, {Component} from 'react';
import { Layer, Stage, Line } from 'react-konva';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  currentDrawing: state.drawkwardRound.currentDrawing,
});


class DrawkwardShowDrawing extends Component {

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Line
            points={this.props.currentDrawing.drawingObj.image}
            stroke={'black'}
            strokeWidth={3}
          />
        </Layer>
      </Stage>
    );
  }
}

export default connect(mapStateToProps)(DrawkwardShowDrawing);
