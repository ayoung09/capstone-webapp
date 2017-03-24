const initialState = {
  scores: {} //{teamName: score}
}

const SET_INITIAL_SCORES = 'set initial scores';
const ADD_POINTS = 'add points'

const pictionaryScoreboardReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case ADD_POINTS:
      newState.scores[action.teamName] += 50;
      break;

    case SET_INITIAL_SCORES:
      action.teams.forEach(team => {
        newState.scores[team.name] = 0
      });
      break;

    default:
      return prevState;
  }
  return newState
}

export const addPoints = teamName => ({
  type: ADD_POINTS,
  teamName
})

export const setInitialScores = (teams) => ({
  type: SET_INITIAL_SCORES,
  teams
})


export default pictionaryScoreboardReducer
