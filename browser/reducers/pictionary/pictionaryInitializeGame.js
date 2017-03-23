//initial state
const initialState = {
  teams: [],
  wordbank: []
}
// const teams = [] //{name: '' , portrait: []}

//constants
const ADD_TEAM = 'add team';
const FETCH_WORDBANK = 'fetch wordbank';

//reducer
const pictionaryInitializeGameReducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)

  switch (action.type) {
    case ADD_TEAM:
      newState.teams = newState.teams.concat(action.teamData);
      break;

    case FETCH_WORDBANK:
      newState.wordbank = newState.wordbank.concat(action.wordbank);
      break;

    default:
      return prevState
  }
  return newState;
};

//action creators
export const addTeam = team => ({
  type: ADD_TEAM,
  teamData: team
})

export const fetchWordbank = (wordbank) => {
  return {
    type: FETCH_WORDBANK,
    wordbank
  }
}

export default pictionaryInitializeGameReducer;
