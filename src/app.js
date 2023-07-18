import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from "socket.io";

import { viewsRouter } from "./routes/views.routes.js";

const port = 8080;
const app = express();

//midlewares
app.use(express.static(path.join(__dirname, "/public")));

//servidor de express
const httpServer = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

//servidor de websocket
const io = new Server(httpServer);

//configuracion de handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

//routes
app.use(viewsRouter);

//historial
let historial = [];

//socket server
io.on("connection", (socket) => {
  console.log("cliente conectado");
  socket.on("message", (data) => {
    console.log("data", data);
    historial.push(data);

    //cada vez que recibamos este mensaje, enviamos todos los mensajes actualizados a todos los clientes
    io.emit("messageHistory", messages);
  });
});
