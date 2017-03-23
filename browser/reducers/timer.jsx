const timer = {secondsRemaining: 90};

//constants
const COUNTDOWN = 'COUNTDOWN'

//reducer
const TimerReducer = (prevState = timer, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case COUNTDOWN:
      newState.secondsRemaining = newState.secondsRemaining - 1;
      break;
    default:
      return prevState;
  }
  return newState;
}

export const countdown = () => ({
  type: COUNTDOWN,
})

export default TimerReducer;
