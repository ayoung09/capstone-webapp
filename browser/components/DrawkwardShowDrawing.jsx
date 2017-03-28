import React, {Component} from 'react';
import { Layer, Stage, Line } from 'react-konva';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  currentDrawing: state.drawkwardRound.currentDrawing,
});


class DrawkwardShowDrawing extends Component {

  render() {
    return (
      <Stage className="show-drawing" width={500} height={500}>
        <Layer className="show-drawing-layer"scaleX={1.25} scaleY={1.25}>
          {this.props.currentDrawing.drawingObj.image.map((lineObj, i) => {
            return (
              <Line
                key={i}
                points={lineObj.line}
                stroke={lineObj.color}
                strokeWidth={3}
              />
            )}
          )}
        </Layer>
      </Stage>
    );
  }
}

export default connect(mapStateToProps)(DrawkwardShowDrawing);
