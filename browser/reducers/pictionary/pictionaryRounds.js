//initial state
const initialState = {
  turns: 0
}

//constants
const SET_COUNT = 'set count';
const MINUS_TURN = 'minus turn'

//reducer
const pictionaryRoundsReducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)

  switch (action.type) {
    case SET_COUNT:
      if (action.count * 2 > newState.turns) {
        newState.turns = action.count * 2 // round is when Team A and Team B have drawn
      }
      break;
    case MINUS_TURN:
      newState.turns--;
      break;
    default:
      return prevState
  }
  return newState;
};

//action creators
export const setRounds = count => {
  return {
    type: SET_COUNT,
    count: count.playerCount
  }
}

export const nextTurn = () => {
  return {
    type: MINUS_TURN
  }
}
export default pictionaryRoundsReducer;
