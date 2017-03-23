//initial state
const scores = {} //{teamName: 0}?

const SET_INITIAL_SCORES = 'set initial scores';
const ADD_POINTS = 'add points'

const pictionaryScoreboardReducer = (prevState = scores, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case ADD_POINTS:
      newState.scores[action.teamName] += 25
      break;

    case SET_INITIAL_SCORES:
      action.teams.forEach(team => {
        newState.scores[name] = 0
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
