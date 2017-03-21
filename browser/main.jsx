'use strict';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import store from './store';

//action-creators
import { receiveAllPhrases } from './reducers/drawkwardFrame';

//components
import AppFrame from './components/AppFrame.jsx';
import Login from './components/Login.jsx';
import DrawkwardFrame from './components/DrawkwardFrame.jsx';
import WaitForDrawings from './components/WaitForDrawings.jsx';
import WaitForCaptions from './components/DrawkwardWaitForCaptions';
import Scoreboard from './components/DrawkwardScoreboard';


const onDrawkwardEnter = () => {
  axios.get('/api/phrases')
    .then(phrases => store.dispatch(receiveAllPhrases(phrases.data)));
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppFrame}>
        <Route path="/login" component={Login} />
        <IndexRedirect to="/login" />
        <Route path="/drawkward" component={DrawkwardFrame} onEnter={onDrawkwardEnter}>
          <Route path="/drawkward/waitForDrawings" component={WaitForDrawings} />
          <Route path="/drawkward/waitForCaptions" component={WaitForCaptions} />
          {/*<Route path="/drawkward/scoreboard" component={Scoreboard} />*/}
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
