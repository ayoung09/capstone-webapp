'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const socketio = require('socket.io');

const { CREATE_NEW_ROOM, JOIN_ROOM, NEW_SOCKET_IN_ROOM, SEND_TO_DRAWKWARD, GO_TO_DRAWKWARD, SEND_TO_PICTIONARY, GO_TO_PICTIONARY, newUser, newDrawing, newGuess, receiveNewUser, receiveNewDrawing, receiveNewGuess, sendStartGame, startGame, sendRandomPhrase, receiveRandomPhrase, TIME_IS_UP, FORCE_SUBMIT_DRAWING, sendToArtist, youAreTheArtist, sendStartCaption, startCaption, receivedAllCaptions, phraseOptions, selectPhrase, receivedSelectedPhrase, nextDrawing, seeNextDrawing, scoreboard, lookAtScoreboard, sendGameOver, gameOver, SEND_START_NEW_GAME, START_NEW_GAME, NEW_TEAM, RECEIVE_NEW_TEAM, SET_ROUND_COUNT, TURN_WAIT, PICK_STARTING_TEAM, CORRECT_GUESS, ADD_POINTS, SKIP, CLEAR_CANVAS, FETCH_NEXT_WORD, SEND_NEW_WORD, RECEIVE_NEW_WORD, NEW_LINE, START_NEW_LINE, NEW_COORDINATES, RECEIVE_NEW_COORDINATES, TIMER_DONE, START_TURN, START_NEW_TURN, START_NEXT_TURN, END_TURN, GAME_OVER, END_GAME, END_TURN_SERVER } = require('../socketConstants');

const app = express();

const server = app.listen(1337, () => {
    console.log('--- The server is listening intently on PORT 1337 ---');
  });

const io = socketio(server);

io.on('connection', socket => {
  console.log('A new user has connected: ', socket.id);

  //webapp creates room
  socket.on(CREATE_NEW_ROOM, data => {
    socket.join(data.room);
  });

  //mobile joins room
  socket.on(JOIN_ROOM, data => {
    socket.join(data.room);
    socket.broadcast.emit(NEW_SOCKET_IN_ROOM);
  });

  socket.on(SEND_TO_DRAWKWARD, data => {
    socket.broadcast.to(data.room).emit(GO_TO_DRAWKWARD);
  });

  socket.on(SEND_TO_PICTIONARY, data => {
    socket.broadcast.to(data.room).emit(GO_TO_PICTIONARY);
  });

  //mobile sends username and portrait
  socket.on(newUser, userObj => {
    socket.broadcast.emit(receiveNewUser, {
      id: socket.id,
      userObj: userObj,
    });
  });

  //mobile starts gameplay
  socket.on(sendStartGame, () => {
    socket.broadcast.emit(startGame);
  });

  //webapp starts game and sends phrases
  socket.on(sendRandomPhrase, data => { //data is {randomPhrases, userIds}
    data.userIds.forEach(userId => {
      let phraseString = data.randomPhrases.shift().text;
      io.to(userId).emit(receiveRandomPhrase, phraseString);
    });
  });

  //mobile sends new drawing
  socket.on(newDrawing, drawingObj => {
    console.log('received new drawing on server: ', drawingObj);
    socket.broadcast.emit(receiveNewDrawing, {
      id: socket.id,
      drawingObj,
    });
  });

  //webapp forces mobile to submit drawing
  socket.on(TIME_IS_UP, usersToForceSubmit => {
      usersToForceSubmit.forEach(user => {
      io.to(user).emit(FORCE_SUBMIT_DRAWING);
    });
  });

  //webapp tells current artist (mobile) to wait
  socket.on(sendToArtist, (artistId) => {
    io.to(artistId).emit(youAreTheArtist);
  });

  //webapp tells mobile users (except artist) to start typing a caption
  socket.on(sendStartCaption, usersToReceive => {
    usersToReceive.forEach(user => {
      io.to(user).emit('begin caption');
    });
  });

  //mobile sends new phrase guess
  socket.on(newGuess, guessString => {
    socket.broadcast.emit(receiveNewGuess, {
      id: socket.id,
      guessString: guessString,
    });
  });

  //webapp sends caption selection options to users except the artist
  socket.on(receivedAllCaptions, ({usersToReceive, captionArray}) => {
    usersToReceive.forEach(user => {
      io.to(user).emit(phraseOptions, captionArray);
    });
  });

  //mobile selects a phrase from group's captions
  socket.on(selectPhrase, guessString => {
    socket.broadcast.emit(receivedSelectedPhrase, {
      id: socket.id,
      selectedPhrase: guessString,
    });
  });

  socket.on(lookAtScoreboard, () => {
    socket.broadcast.emit(scoreboard);
  });

  //mobile calls to see next drawing after scoreboard
  socket.on(nextDrawing, () => {
    socket.broadcast.emit(seeNextDrawing);
  });

  //webapp says game is over
  socket.on(sendGameOver, () => {
    socket.broadcast.emit(gameOver);
  });

  //mobile wants to start a new game
  socket.on(SEND_START_NEW_GAME, () => {
    socket.broadcast.emit(START_NEW_GAME);
  });

  //pictionary

    //mobile sends team data
  socket.on(NEW_TEAM, teamData => {
    socket.broadcast.emit(RECEIVE_NEW_TEAM, {
      name: teamData.name,
      portrait: teamData.portrait,
      id: socket.id
    })
    socket.broadcast.emit(SET_ROUND_COUNT, {
      playerCount: teamData.members
    })
  })

  socket.on(PICK_STARTING_TEAM, teams => {
    io.to(teams[0].id).emit(START_TURN);
    io.to(teams[1].id).emit(TURN_WAIT);
  })


  //mobile sends coordinates for drawing; server sends to drawing pane
  socket.on(NEW_LINE, () => {
    socket.broadcast.emit(START_NEW_LINE)
  })

  socket.on(NEW_COORDINATES, coord => {
    socket.broadcast.emit(RECEIVE_NEW_COORDINATES, coord)
  })

  //mobile guesses correctly; requests new word
  socket.on(CORRECT_GUESS, teamName => {
    socket.broadcast.emit(FETCH_NEXT_WORD);
    socket.broadcast.emit(ADD_POINTS, teamName)
    socket.broadcast.emit(CLEAR_CANVAS)
  })
 //mobile skips word; requests new word
  socket.on(SKIP, () => {
    socket.broadcast.emit(FETCH_NEXT_WORD)
    socket.broadcast.emit(CLEAR_CANVAS)
  })

  //web app sends new word; server sends word to mobile
  socket.on(SEND_NEW_WORD, word => {
    socket.broadcast.emit(RECEIVE_NEW_WORD, word)
  })

  socket.on(TIMER_DONE, () => {
    socket.emit(CLEAR_CANVAS);
    socket.broadcast.emit(END_TURN);
  })

  socket.on(START_NEXT_TURN, () => {
    socket.emit(CLEAR_CANVAS)
    socket.broadcast.emit(START_TURN);
    socket.emit(FETCH_NEXT_WORD);
  })

  socket.on(END_GAME, () => {
    socket.emit(CLEAR_CANVAS);
    socket.broadcast.emit(GAME_OVER);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected :(');
  });
});


app
  .use(require('volleyball'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  .use(express.static(resolve(__dirname, '..', 'public')))
  .use(express.static('./public/css/'))

  .use('/api', require('./api'))

  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  .use((err, req, res, next) => {
    console.log('Problem at the start');
    res.status(500).send(err);
    next();
  });

module.exports = app;
