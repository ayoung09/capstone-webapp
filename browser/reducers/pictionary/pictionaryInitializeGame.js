//initial state
const teams = [] //{name: '' , portrait: []}

//constants
const ADD_TEAM = 'add team'

const pictionaryInitializeGameReducer = (prevState = teams, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case ADD_TEAM:
      newState.teams = newState.teams.concat({[action.id]: action.teamData})
      break;

    default:
      return prevState
  }
  return newState;
};

//action creators
export const addTeam = team => ({
  type: ADD_TEAM,
  teamData: {
    name: team.name,
    portrait: team.portrait
  }
})

export default pictionaryInitializeGameReducer;
