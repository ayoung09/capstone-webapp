import React from 'react';
import {Layer, Stage, Line} from 'react-konva';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    currentDrawing: state.drawkwardRound.currentDrawing
  }
}

class DrawkwardShowDrawing extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Line
            points={this.props.currentDrawing.image}
            stroke={'black'}
            strokeWidth={3}
          />
        </Layer>
      </Stage>
    );
  }
}

export default connect(mapStateToProps)(DrawkwardShowDrawing);
