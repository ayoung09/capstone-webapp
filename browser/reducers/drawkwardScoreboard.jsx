// Won't this result in something like scores.scores? or just drawkwardScoreboard.scores.
// Perhaps don't nest state unnecessarily
const initialState = {
  scores: {}, //{{socketId: 0}, {}}
};

//constants
const SET_INITIAL_SCORES = 'SET_INITIAL_SCORES';
const ADD_50 = 'ADD_50';
const ADD_100 = 'ADD_100';

//reducer
const drawkwardScoreboardReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_INITIAL_SCORES:
      newState.scores = action.scores;
      break;
    // Why not just have an addPoints reducers and have the action creators be called add50 and add100 and both reference one reducer case
    case ADD_50:
      let tempScores50 = Object.assign({}, newState.scores);
      tempScores50[action.socketId] += 50;
      newState.scores = tempScores50;
      break;
    case ADD_100:
      let tempScores100 = Object.assign({}, newState.scores);
      tempScores100[action.socketId] += 100;
      newState.scores = tempScores100;
      break;
    default:
      return prevState;
  }
  return newState;
};

//utility functions
const createScoreboard = usersArray => {
  const board = {};
  usersArray.forEach(socketId => {
    board[socketId] = 0;
  });
  return board;
};

//action-creators
export const setInitialScores = usersArray => ({
  type: SET_INITIAL_SCORES,
  scores: createScoreboard(usersArray),
});

export const add50 = socketId => ({
  type: ADD_50,
  socketId,
});

export const add100 = socketId => ({
  type: ADD_100,
  socketId,
});

export default drawkwardScoreboardReducer;
