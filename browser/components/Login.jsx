import React from 'react';
import { Link } from 'react-router';

const Login = () => {
  return (
    <div>
      <h2>Choose a game to play!</h2>
      <Link to="/drawkward"><button className="btn-game">Drawkward</button></Link>
      <Link to="/pictionary"><button className="btn-game">Pictionary</button></Link>
    </div>
  );
};

export default Login;
