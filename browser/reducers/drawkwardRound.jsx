const initialState = {
  currentDrawing: {}, //{socketId: {image: , phrase: }}
  phraseGuesses: {}, //{{socketId: ''}, {}}
  allDrawings: [],
};

//constants
const SET_CURRENT_DRAWING = 'SET_CURRENT_DRAWING';
const ADD_DRAWING = 'ADD_DRAWING';
const ADD_PHRASE_GUESS = 'ADD_PHRASE_GUESS';
const CLEAR_ROUND = 'CLEAR_ROUND';

//reducer
const drawkwardRoundReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_CURRENT_DRAWING:
      let nextDrawing = newState.allDrawings.shift();
      newState.currentDrawing = nextDrawing;
      break;
    case ADD_DRAWING:
      newState.allDrawings.push(action.drawingObj);
      break;
    case ADD_PHRASE_GUESS:
      newState.phraseGuesses[action.id] = action.phrase;
      break;
    case CLEAR_ROUND:
      newState.currentDrawing = {};
      newState.phraseGuesses = {};
      break;
    default:
      return prevState;
  }
  return newState;
};

//action-creators
export const setCurrentDrawing = () => ({
  type: SET_CURRENT_DRAWING,
});

export const addDrawing = (drawingObj) => ({
  type: ADD_DRAWING,
  drawingObj,
});

export const addPhraseGuess = (socketId, userObj) => ({
  type: ADD_PHRASE_GUESS,
  id: socketId,
  userObj,
});

export const clearRound = () => ({
  type: CLEAR_ROUND,
});

export default drawkwardRoundReducer;
