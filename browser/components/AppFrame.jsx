import React from 'react';

const AppFrame = ({ children }) => {
  return (
    <div className="container-fluid">
      <div>
        <h2>Welcome to Drawkward!</h2>
      </div>
      <div>
        { children }
      </div>
    </div>
  );
};


export default AppFrame;
