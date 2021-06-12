import createClient from "./client/index.js";
import createActivity from "./activity/stages/testDrag.js";

const btnConnect = document.getElementById("button-connect");
const btnDisconnect = document.getElementById("button-disconnect");
const activityContainer = document.getElementById("activity-container");
const inputRoom = document.getElementById("input-room");
const btnJoin = document.getElementById("button-join");
const btnLeave = document.getElementById("button-leave");

function App() {
  const client = createClient("http://localhost:3000");

  client.onConnect((id) => {
    console.log(`Conectado con el id ${id}`);
    setStatusStyles(true);
    createActivity(activityContainer, client);
  });

  client.onDisconnect(() => {
    console.log(`Desconectado del servidor`);
    setStatusStyles(false);
  });

  client.onMessage((message, client) => {
    console.log(message, "incomming", client);
    updateStage(message);
  });

  btnConnect.addEventListener("click", (e) => {
    e.preventDefault();
    client.connect();
  });

  btnDisconnect.addEventListener("click", (e) => {
    e.preventDefault();
    client.disconnect();
  });

  btnJoin.addEventListener("click", (e) => {
    e.preventDefault();
    client.join(inputRoom.value, (room) => {
      console.log(`Te uniste a la sala ${room}`);
    });
  });

  btnLeave.addEventListener("click", (e) => {
    e.preventDefault();
    client.leave(inputRoom.value, (room) => {
      console.log(`Abandonaste a la sala ${room}`);
    });
  });

  function updateStage(message, type, sender) {
    console.log(message);
    // TODO
  }

  function setStatusStyles(connected) {
    if (connected) {
      btnConnect.classList.add("disabled");
      btnConnect.classList.remove("enabled");
      btnDisconnect.classList.add("enabled");
      btnDisconnect.classList.remove("disabled");
    } else {
      btnConnect.classList.add("enabled");
      btnConnect.classList.remove("disabled");
      btnDisconnect.classList.add("disabled");
      btnDisconnect.classList.remove("enabled");
    }
  }

  setStatusStyles();
}

export default App;
