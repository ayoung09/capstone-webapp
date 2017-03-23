import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 90
    };
  }

  countDown() {
    this.setState({secondsRemaining: 90 - 1});
  }

}

export default Timer;
