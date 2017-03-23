//initial state
const initialState = {
  teams: []
}
// const teams = [] //{name: '' , portrait: []}

//constants
const ADD_TEAM = 'add team'

//reducer
const pictionaryInitializeGameReducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)

  switch (action.type) {
    case ADD_TEAM:
      newState.teams.push(action.teamData);
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

export default pictionaryInitializeGameReducer;
