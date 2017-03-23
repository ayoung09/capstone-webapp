//initial state
const teams = [] //{name: '' , portrait: []}

//constants
const ADD_TEAM = 'add team'

const pictionaryInitializeGameReducer = (prevState = teams, action) => {
  let newState = [].concat(prevState);

  switch (action.type) {
    case ADD_TEAM:
      newState = newState.concat(action.teamData);
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
