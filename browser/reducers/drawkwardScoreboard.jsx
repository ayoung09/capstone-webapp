const initialState = {
  scores: {}, //{socketId: 0, socketId2: 10}
};

//constants
const SET_INITIAL_SCORES = 'SET_INITIAL_SCORES';
const ADD_POINTS = 'ADD_POINTS';

//reducer
const drawkwardScoreboardReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_INITIAL_SCORES:
      newState.scores = action.scores;
      break;
    case ADD_POINTS:
      const tempScores50 = Object.assign({}, newState.scores);
      tempScores50[action.socketId] += action.points;
      newState.scores = tempScores50;
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
  type: ADD_POINTS,
  points: 50,
  socketId,
});

export const add100 = socketId => ({
  type: ADD_POINTS,
  points: 100,
  socketId,
});

export default drawkwardScoreboardReducer;
