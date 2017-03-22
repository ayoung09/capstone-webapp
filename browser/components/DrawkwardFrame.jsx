import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shuffle from 'shuffle-array';
import socket from '../socket';

import { addUser, setRounds } from '../reducers/drawkwardFrame';
import { setInitialScores } from '../reducers/drawkwardScoreboard';
import { receiveNewUser, startGame, sendRandomPhrase } from '../../socketConstants';


const mapStateToProps = state => ({
  users: state.drawkwardFrame.users,
  phrases: state.drawkwardFrame.phrases,
  rounds: state.drawkwardFrame.rounds,
});

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(addUser(user)),
  setRounds: (numOfUsers) => dispatch(setRounds(numOfUsers)),
  setInitialScores: usersArray => dispatch(setInitialScores(usersArray)),
});


class DrawkwardFrame extends Component {

  componentDidMount() {
    socket.on(receiveNewUser, userObj => {
      this.props.addUser(userObj);
    });

    socket.on(startGame, () => {
      this.emitRandomPhrasesToMobile();
      this.props.setInitialScores(Object.keys(this.props.users));
      this.props.setRounds(Object.keys(this.props.users).length);
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
        {this.props.children ? this.props.children :
          <div>
            <h2>Create a username and portrait in your mobile app</h2>
            <h3>When all users have signed in, hit START to begin your game</h3>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawkwardFrame);
