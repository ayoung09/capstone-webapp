const initialState = {
  users: {}, //{{socketId: {name: , portrait: , score: }}, {}}
  phrases: [],
  rounds: 0,
};

//constants
const ADD_USER = 'ADD_USER';
const RECEIVE_ALL_PHRASES = 'RECEIVE_ALL_PHRASES';
const SET_ROUNDS = 'SET_ROUNDS';
const NEXT_ROUND = 'NEXT_ROUND';

//reducer
const drawkwardFrameReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case ADD_USER:
      newState.users[action.id] = action.userObj;
      break;
    case RECEIVE_ALL_PHRASES:
      newState.phrases = action.phrases;
      break;
    case SET_ROUNDS:
      newState.rounds = action.rounds;
      break;
    case NEXT_ROUND:
      newState.rounds -= 1;
      break;
    default:
      return prevState;
  }
  return newState;
};

//action-creators
export const addUser = (socketId, userObj) => ({
  type: ADD_USER,
  id: socketId,
  userObj,
});

export const receiveAllPhrases = (phrases) => ({
  type: RECEIVE_ALL_PHRASES,
  phrases,
});

export const setRounds = (numOfUsers) => ({
  type: SET_ROUNDS,
  rounds: numOfUsers <= 8 ? 3 : 2,
});

export const nextRound = () => ({
  type: NEXT_ROUND,
});

export default drawkwardFrameReducer;
