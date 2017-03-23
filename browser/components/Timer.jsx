import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 90,
    };
    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
  }

  componentWillMount() {
    this.setState({secondsRemaining: this.props.seconds});
  }

  componentDidMount() {
    this.interval = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log('these are secondsRemaining: ', this.props.secondsRemaining);
    return (
      <div>
        {this.props.secondsRemaining > 0 ?
          <div id="countdown-timer">
            <h2>Finish your drawings before time runs out!</h2>
            <h1 id="show-seconds">{this.props.secondsRemaining}</h1>
          </div>
          : <h1>TIME IS UP! SUBMIT ALL DRAWINGS!</h1>
        }
      </div>
    );
  }
}

export default Timer;
