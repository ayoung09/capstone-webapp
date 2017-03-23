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
        <Layer scaleX={1.5} scaleY={1.5}>
          {this.props.currentDrawing.drawingObj.image.map((line, i) => {
            return (
              <Line
                key={i}
                points={line}
                stroke={'black'}
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
