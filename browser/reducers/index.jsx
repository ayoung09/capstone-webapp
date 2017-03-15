import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  drawkwardFrame: require('./drawkwardFrame.jsx').default,
  drawkwardRound: require('./drawkwardRound.jsx').default,
});

export default rootReducer;
