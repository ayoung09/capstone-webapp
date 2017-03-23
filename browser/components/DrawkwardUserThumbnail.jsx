import React from 'react';
import { Layer, Stage, Line } from 'react-konva';

const DrawkwardUserThumbnail = ({userName, image}) => {
  return (
    <div>
      <div>
        <h4>{userName}</h4>
      </div>
      <Stage width={200} height={200}>
        <Layer>
          {image.map((line, i) => {
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

export default DrawkwardUserThumbnail;