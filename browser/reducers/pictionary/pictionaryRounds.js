//initial state
const initialState = {
  turns: 0
}

//constants
const SET_COUNT = 'set count';

//reducer
const pictionaryRoundsReducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)

  switch (action.type) {
    case SET_COUNT:
      if (action.count * 2 > newState.rounds) {
        newState.turns = action.count * 2 // round is when Team A and Team B have drawn, so
      }
      break;

    default:
      return prevState
  }
  return newState;
};

//action creators
export const setRound = playerCount => {
  return {
    type: SET_COUNT,
    count: playerCount
  }
}

export default pictionaryRoundsReducer;
