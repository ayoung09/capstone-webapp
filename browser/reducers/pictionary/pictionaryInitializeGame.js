const initialState = {
  teams: {}, //socketId: {name: , portrait}
}

//constants
const ADD_TEAM = 'add team'

const pictionaryInitializeGameReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case ADD_TEAM:
      const newTeams = Object.assign({}, newState.teams);
      newTeams[action.id] = action.team;
      newState.teams = newTeams;
      break;

    default:
      return prevState
  }
  return newState;
};

//action creators
export const addTeam = team => ({
  type: ADD_TEAM,
  id: team.id,
  team: team.teamData
})

export default pictionaryInitializeGameReducer;
