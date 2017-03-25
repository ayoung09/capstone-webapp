import React, {Component} from 'react';
import { Layer, Stage, Line } from 'react-konva';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  currentDrawing: state.drawkwardRound.currentDrawing,
});


class DrawkwardShowDrawing extends Component {

  render() {
    return (
      <div className="show-drawing-wrapper">
        <Stage className="show-drawing" width={425} height={500}>
          <Layer scaleX={1.3} scaleY={1.3}>
            {this.props.currentDrawing.drawingObj.image.map((lineObj, i) => {
              return (
                <Line
                  key={i}
                  points={lineObj.line}
                  stroke={lineObj.color}
                  strokeWidth={4}
                />
              )}
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DrawkwardShowDrawing);
