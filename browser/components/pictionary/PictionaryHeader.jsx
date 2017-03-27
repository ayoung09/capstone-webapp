import React from 'react';
import { Link } from 'react-router';

const PictionaryHeader = () => {
  return (
    <div className="header-pictionary">
      <Link to="/login"><button className="btn-game btn-quit">Quit Game</button></Link>
      <img id="drawkward-logo-pictionary" src="/images/drawkward.png" />
      <p className="pictionary-subheader">Pictionary</p>
    </div>
  );
};

export default PictionaryHeader;
