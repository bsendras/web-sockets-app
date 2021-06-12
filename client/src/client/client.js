import { events, errors } from "./constants.js";

function createClient(url) {
  const socket = io(url, {
    autoConnect: false,
  });

  // Metodos
  const connect = () => {
    socket.open();
  };

  const disconnect = () => {
    socket.close();
  };

  const join = (room, cb) => {
    if (!room) new Error(errors.ERR_JOIN);
    socket.emit(events.JOIN, room, cb);
  };

  const leave = (room, cb) => {
    if (!room) new Error(errors.LEAVE);
    socket.emit(events.LEAVE, room, cb);
  };

  const send = (room, data, cb) => {
    if (!room) new Error(ERR_SEND);
    socket.emit(events.MSG, room, data, cb);
  };

  // Eventos
  const onConnect = (cb) => {
    socket.on(events.CONNECT, () => {
      if (cb) cb(socket.id);
    });
  };

  const onDisconnect = (cb) => {
    socket.on(events.DISCONNECT, () => {
      if (cb) cb();
    });
  };

  const onMessage = (cb) => {
    socket.on(events.MSG, (data) => {
      if (cb) cb(data);
    });
  };

  return {
    connect,
    disconnect,
    join,
    leave,
    send,
    onConnect,
    onDisconnect,
    onMessage,
  };
}

export { createClient };
