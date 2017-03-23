//initial state
const scores = {} //{socketId: 0}

const pictionaryScoreboardReducer = (prevState = scores, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case ADD_POINTS:
      newState.scores[action.id] += 10
      //need to make sure this is immutable and will trigger a render
      break;

    default:
      return prevState;
  }
  return newState
}

export default pictionaryScoreboardReducer
