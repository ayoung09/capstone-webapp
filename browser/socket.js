import io from 'socket.io-client';
import ipAddress from '../ipAddress';

  const socket = io(ipAddress);

  socket.on('connect', () => {
    console.log('Connection from the server');
  });

export default socket;

//Constants between mobile and server
export const newRoom = 'new room';
export const newUser = 'new user';
export const newDrawing = 'new drawing';
export const newPhrase = 'new phrase';
export const newGuess = 'new guess';

export const receiveRandomPhrase = 'receive random phrase';


//Constants between server and browser
export const receiveNewUser = 'receive new user';
export const receiveNewDrawing = 'receive new drawing';
export const receiveNewGuess = 'receive new guess';

export const sendRandomPhrase = 'send random phrase';
