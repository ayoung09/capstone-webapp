import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  drawkwardFrame: require('./drawkwardFrame.jsx').default,
  drawkwardRound: require('./drawkwardRound.jsx').default,
  drawkwardScoreboard: require('./drawkwardScoreboard.jsx').default,
  timer: require('./timer.jsx').default,
  pictionaryInitializeGame: require('./pictionary/pictionaryInitializeGame').default,
  pictionaryScoreboard: require('./pictionary/pictionaryScoreboard').default
});

export default rootReducer;
