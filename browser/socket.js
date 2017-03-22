import io from 'socket.io-client';
import ipAddress from '../ipAddress';

  const socket = io(ipAddress);

  socket.on('connect', () => {
    //Do we want to be using console.log? What if this is prod? File writing?
    console.log('Connection from the server');
  });

export default socket;
