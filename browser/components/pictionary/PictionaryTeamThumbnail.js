import React from 'react';
import { Layer, Stage, Line } from 'react-konva';

const PictionaryTeamThumbnail = (props) => {
  return (
    <div className="thumbnail-container">
      <div className="username">
        <h2 className="username-header">{props.team.name}</h2>
      </div>
      <div className="thumbnail-portrait">
        <Stage width={150} height={150}>
          <Layer scaleX={0.4} scaleY={0.4}>
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
    </div>
  );
};

export default PictionaryTeamThumbnail;
