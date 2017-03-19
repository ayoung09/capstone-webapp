import shuffle from 'shuffle-array';

const initialState = {
  currentDrawing: {}, //{socketId: {image: , phrase: }}
  phraseGuesses: [], //[{socketId: ''}, {}]
  allDrawings: [],
  selectedPhraseGuesses: []
};

//constants
const SET_CURRENT_DRAWING = 'SET_CURRENT_DRAWING';
const ADD_DRAWING = 'ADD_DRAWING';
const ADD_PHRASE_GUESS = 'ADD_PHRASE_GUESS';
const CLEAR_ROUND = 'CLEAR_ROUND';
const ADD_SELECTED_PHRASE = 'ADD_SELECTED_PHRASE'

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
      newState.phraseGuesses.push({[action.id]: action.phrase})
      break;
    case CLEAR_ROUND:
      newState.currentDrawing = {};
      newState.phraseGuesses = {};
      break;
    case ADD_SELECTED_PHRASE:
      let arrayToShuffle = newState.selectedPhraseGuesses.push({[action.id]: action.selectedPhrase });
      let shuffled = shuffle(arrayToShuffle)
      newState.selectedPhraseGuesses = shuffled;
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

export const addPhraseGuess = (socketId, guessStr) => ({
  type: ADD_PHRASE_GUESS,
  id: socketId,
  guess: guessStr,
});

export const addSelectedPhrase = (phraseObj) => ({
  type: ADD_SELECTED_PHRASE,
  id: phraseObj.id,
  selectedPhrase: phraseObj.selectedPhrase
});

export const clearRound = () => ({
  type: CLEAR_ROUND,
});

export default drawkwardRoundReducer;
