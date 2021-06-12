const { events, errors } = require("./constants.js");
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: [
      // origenes permitidos
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "https://admin.socket.io",
    ],
  },
});

function userIsInRoom(room, socketId) {
  let rooms = io.sockets.adapter.rooms;
  console.log(rooms);
  item = rooms.get(room);
  if (!item || (item && !item.has(socketId))) {
    return false;
  }
  return true;
}

io.on(events.CONNECTION, (socket) => {
  // cliente connectado
  console.log(`client socket id:  ${socket.id}`);

  socket.on(events.MSG, (room, data) => {
    console.log(data, room);
    if (!userIsInRoom(room, socket.id)) {
      console.log(`user not in the room: ${room}`);
    }
    socket.to(room).emit(events.MSG, data, socket.id);
  });

  socket.on(events.JOIN, (room, cb) => {
    socket.join(room);
    if (cb) cb(room);
  });

  socket.on(events.LEAVE, (room, cb) => {
    socket.leave(room);
    if (cb) cb(room);
  });

  socket.on(events.PROFILE, (room, data, cb) => {
    socket.nickname = nickname;
    users.push(socket.nickname);
    console.log(`users: ${users}`);
    if (cb) cb();
  });
});

// herramienta de metricas (Sin autenticación)
instrument(io, { auth: false });
