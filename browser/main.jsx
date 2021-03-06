'use strict';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import shuffle from 'shuffle-array'

import store from './store';

//action-creators
import { receiveAllPhrases, clearGame } from './reducers/drawkwardFrame';
import { createRoom } from './reducers/loginRoom';
import { fetchWordbank } from './reducers/pictionary/pictionaryInitializeGame';

//drawkward components
import AppFrame from './components/AppFrame.jsx';
import Login from './components/Login.jsx';
import DrawkwardFrame from './components/DrawkwardFrame.jsx';
import WaitForDrawings from './components/WaitForDrawings.jsx';
import WaitForCaptions from './components/DrawkwardWaitForCaptions';
import ListCaptions from './components/ListCaptions';
import Scoreboard from './components/DrawkwardScoreboard';
import Winner from './components/DrawkwardWinner';

//pictionary components
import PictionaryFrame from './components/pictionary/PictionaryFrame';
import PictionaryMain from './components/pictionary/PictionaryMain';
import PictionaryGameOver from './components/pictionary/PictionaryGameOver';

const onDrawkwardEnter = () => {
  const randomRoomName = generateRandomRoomName();
  store.dispatch(clearGame());
  store.dispatch(createRoom(randomRoomName));
  axios.get('/api/phrases')
    .then(phrases => store.dispatch(receiveAllPhrases(phrases.data)));
};

const onPictionaryEnter = () => {
  const randomRoomName = generateRandomRoomName();
  store.dispatch(createRoom(randomRoomName));
  axios.get('/api/wordbank')
    .then(wordbank => store.dispatch(fetchWordbank(shuffle(wordbank.data))));
};

function generateRandomRoomName() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const roomNameLength = 4;
  let roomName = '';
  while (roomName.length < roomNameLength) {
    let randomLetter = alphabet[Math.ceil(Math.random() * 25)];
    roomName += randomLetter;
  }
  return roomName;
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppFrame}>
        <Route path="/login" component={Login} />
        <IndexRedirect to="/login" />
        <Route path="/drawkward" component={DrawkwardFrame} onEnter={onDrawkwardEnter}>
          <Route path="/drawkward/waitForDrawings" component={WaitForDrawings} />
          <Route path="/drawkward/waitForCaptions" component={WaitForCaptions} />
          <Route path="/drawkward/listCaptions" component={ListCaptions} />
          <Route path="/drawkward/scoreboard" component={Scoreboard} />
          <Route path="/drawkward/winner" component={Winner} />
        </Route>
        <Route path="/pictionary" component={PictionaryFrame} onEnter={onPictionaryEnter}>
          <Route path="/pictionary/main" component={PictionaryMain} />
          <Route path="/pictionary/gameover" component={PictionaryGameOver} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
