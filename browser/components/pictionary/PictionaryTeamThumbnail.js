import React from 'react';
import { Layer, Stage, Line } from 'react-konva';

const PictionaryTeamThumbnail = (props) => {
  return (
    <div>
      <div>
        <h4>{props.team.name}</h4>
      </div>
      <Stage width={200} height={200}>
        <Layer>
          {props.team.portrait.map((line, i) => {
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
    </div>
  );
};

export default PictionaryTeamThumbnail;
