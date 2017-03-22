import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import socket from '../../socket';

class PictionaryMain extends Component {

  render() {
    return (
      <div>
        <h3>team 1 scores</h3>
        <h3>Drawing canvas</h3>
        <h3>team 2 scores</h3>
      </div>
    )
  }
}

export default PictionaryMain
