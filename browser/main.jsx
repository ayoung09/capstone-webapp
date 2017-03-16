'use strict';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import store from './store';

//action-creators
import { receiveAllPhrases } from './reducers/drawkwardFrame.jsx';

//components
import AppFrame from './components/AppFrame.jsx';
import Login from './components/Login.jsx';
import DrawkwardFrame from './components/DrawkwardFrame.jsx';


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
        <Route path="/drawkward" component={DrawkwardFrame} onEnter={onDrawkwardEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
