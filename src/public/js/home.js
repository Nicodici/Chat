const socketCLiente = io();

const chatbox = document.getElementById("chatbox");

let user;

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un nombre de usuario para el chat",
  inputValidator: (value) => {
    if (!value) {
      return "El nombre de usuario es obligatorio";
    }
  },
  allowOutsideClick: false, //el usuario no puede saltearse el ingreso de usuario
}).then((result) => {
  user = result.value;
  console.log("user", user);
});

chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      //corroboramos que el usuario no envien caracteres vacios
      socketCLiente.emit("message", { user: user, message: chatbox.value });
      chatbox.value = ""; //borramos el campo
    }
  }
});

socketCLiente.on("messageHistory",(dataServer)=>{
    let messageElements = "";
    console.log("dataServer", dataServer)
    dataServer.forEach(element => {
        messageElements = messageElements + `${item.user}`
    });
})