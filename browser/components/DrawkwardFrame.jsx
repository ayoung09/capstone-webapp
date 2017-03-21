import React, { Component } from 'react';
import socket from '../socket';
import shuffle from 'shuffle-array';

import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { addUser, setRounds, nextRound } from '../reducers/drawkwardFrame';

import { receiveNewUser, startGame, sendRandomPhrase } from '../../socketConstants';


const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  phrases: state.drawkwardFrame.phrases,
  rounds: state.drawkwardFrame.rounds,
});

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(addUser(user)),
  setRounds: (numOfUsers) => dispatch(setRounds(numOfUsers)),
  initializeRound: () => dispatch(nextRound()),
});


class DrawkwardFrame extends Component {

  componentDidMount() {
    socket.on(receiveNewUser, userObj => {
      this.props.addUser(userObj);
    });

    socket.on(startGame, () => {
      this.emitRandomPhrasesToMobile();
      browserHistory.push('/drawkward/waitForDrawings');
    });
  }

  componentWillUnmount() {
    socket.off(receiveNewUser);
    socket.off(startGame);
  }

  emitRandomPhrasesToMobile() {
    let numOfUsers = Object.keys(this.props.users).length;
    let randomPhrases = shuffle.pick(this.props.phrases, {'picks': numOfUsers});
    let userIds = Object.keys(this.props.users);
    socket.emit(sendRandomPhrase, {randomPhrases, userIds});
  }

  render() {
    return (
      <div>
        <h2>Create a username and portrait in your mobile app</h2>
        <h4>When all users have signed in, hit START to begin your game</h4>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardFrame);
