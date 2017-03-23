const timer = {secondsRemaining: 60};

//constants
const SET_TIMER = 'SET_TIMER';
const COUNTDOWN = 'COUNTDOWN';

//reducer
const TimerReducer = (prevState = timer, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case COUNTDOWN:
      newState.secondsRemaining = newState.secondsRemaining - 1;
      break;
    case SET_TIMER:
      newState.secondsRemaining = action.startingSeconds;
      break;
    default:
      return prevState;
  }
  return newState;
};

export const setTimer = (startingSeconds) => ({
  type: SET_TIMER,
  startingSeconds,
});

export const countdown = () => ({
  type: COUNTDOWN,
});

export default TimerReducer;
