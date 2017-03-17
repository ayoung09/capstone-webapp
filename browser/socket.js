import io from 'socket.io-client';
import ipAddress from '../ipAddress';

  const socket = io(ipAddress);

  socket.on('connect', () => {
    console.log('Connection from the server');
  });

export default socket;
