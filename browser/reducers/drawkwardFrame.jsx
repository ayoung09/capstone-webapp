import shuffle from 'shuffle-array';

// We could probably stand to break up these files a little

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
      let newUsers = Object.assign({}, newState.users);
      newUsers[action.id] = action.userObj;
      newState.users = newUsers;
      break;
    case RECEIVE_ALL_PHRASES:
      let shuffled = shuffle(action.phrases);
      newState.phrases = shuffled;
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
          // a little weird. Maybe userData and userId above?
  userObj: userObj.userObj,
});

export const receiveAllPhrases = (phrases) => ({
  type: RECEIVE_ALL_PHRASES,
  phrases,
});

export const setRounds = (numOfUsers) => ({
  type: SET_ROUNDS,
                      ///Avoid the use of magic numbers
  rounds: numOfUsers <= 8 ? 2 : 1,
});

export const nextRound = () => ({
  type: NEXT_ROUND,
});

export default drawkwardFrameReducer;
