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

//phraseGuesses = [{phrase: socketid}]
//selectedPhraseGuesses = [{socketid: phrase}]
const calculateScores = (scores, originalPhrase, phraseGuesses, selectedPhraseGuesses) => {
  selectedPhraseGuesses.forEach(phraseObj => {
    for (let idKey in phraseObj) {

    }
  })
}

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
