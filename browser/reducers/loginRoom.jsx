//constants
const CREATE_ROOM = 'CREATE_ROOM';

const LoginRoomReducer = (prevState = {roomName: ''}, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case CREATE_ROOM:
      newState.roomName = action.roomName;
      break;
    default:
      return prevState;
  }
  return newState;
};

export const createRoom = roomName => ({
  type: CREATE_ROOM,
  roomName,
});

export default LoginRoomReducer;
