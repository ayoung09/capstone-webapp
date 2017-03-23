import shuffle from 'shuffle-array';

const initialState = {
  users: {}, //{socketId: {name: , portrait: }, socketId2: {name: , portrait}}
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
      const newUsers = Object.assign({}, newState.users);
      newUsers[action.id] = action.userObj;
      newState.users = newUsers;
      break;
    case RECEIVE_ALL_PHRASES:
      shuffle(action.phrases);
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
export const addUser = (userObj) => ({
  type: ADD_USER,
  id: userObj.id,
  userObj: userObj.userObj,
});

export const receiveAllPhrases = (phrases) => ({
  type: RECEIVE_ALL_PHRASES,
  phrases,
});

export const setRounds = (numOfUsers) => ({
  type: SET_ROUNDS,
  rounds: determineNumberOfRounds(numOfUsers),
});

export const nextRound = () => ({
  type: NEXT_ROUND,
});

function determineNumberOfRounds(numOfUsers) {
  const numberOfRounds = numOfUsers <= 8 ? 2 : 1;
  return numberOfRounds;
}

export default drawkwardFrameReducer;
