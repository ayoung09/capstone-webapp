import React from 'react';
import { Layer, Stage, Line } from 'react-konva';

const DrawkwardUserThumbnail = ({userName, image}) => {
  return (
    <div className="thumbnail-container">
      <div className="username">
        <h4 className="username-header">{userName}</h4>
      </div>
      <div className="thumbnail-portrait">
        <Stage height={150} width={150}>
          <Layer scaleX={0.4} scaleY={0.4}>
            {image.map((lineObj, i) => {
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
    </div>
  );
};

export default DrawkwardUserThumbnail;
