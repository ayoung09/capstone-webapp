import React from 'react';

const AppFrame = ({ children }) => {
  return (
    <div id="main-drawkward-frame" className="container-fluid">
      <div className="header">
        <img id="drawkward-logo" src="/images/drawkward.png" />
      </div>
      <div className="drawkward-child">
        { children }
      </div>
    </div>
  );
};


export default AppFrame;
