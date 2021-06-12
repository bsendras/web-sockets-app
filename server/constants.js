const events = {
  CONNECTION: "connection",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN: "join",
  LEAVE: "leave",
  MSG: "atelmsg",
  PROFILE: "user",
};

const errors = {
  ERR_JOIN: "join failed: invalid room",
  ERR_LEAVE: "leave failed: invalid room",
  ERR_SEND: "send failed: invalid room",
};

module.exports = {
  events,
  errors,
};
