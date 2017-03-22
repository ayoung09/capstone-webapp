import React from 'react';

const AppFrame = ({ children }) => {
  return (
    <div id="main-drawkward-frame" className="container-fluid">
      <div className="header">
        <h2 className="pad5 marg5">Welcome to Drawkward!</h2>
      </div>
      <div className="drawkward-child">
        { children }
      </div>
    </div>
  );
};


export default AppFrame;
