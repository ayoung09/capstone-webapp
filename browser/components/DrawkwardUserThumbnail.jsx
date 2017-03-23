import React from 'react';
import { Layer, Stage, Line } from 'react-konva';

const DrawkwardUserThumbnail = ({userName, image}) => {
  return (
    <div>
      <div>
        <h4>{userName}</h4>
      </div>
      <div className="thumbnail-portrait">
        <Stage height={200} width={200}>
          <Layer scaleX={0.5} scaleY={0.5}>
            {image.map((line, i) => {
              console.log('this is line: ', line);
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

export default DrawkwardUserThumbnail;
