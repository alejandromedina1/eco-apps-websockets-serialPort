//1. Import express, socket.io, serialPort and cors
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
//IMPORT SERIALPORT AND READLINEPARSER FROM SERIALPORT
import { SerialPort, ReadlineParser } from "serialport";

//2. Set the server's configuration with EXPRESS
const PORT = 5050;
const expressApp = express();
expressApp.use(cors({ origin: "*" }));
expressApp.use(express.json());
expressApp.use("/mupi", express.static("public-mupi"));
expressApp.use("/mobile", express.static("public-mobile"));

//3. Now, we create the server using EXPRESS
const server = expressApp.listen(PORT, () => {
  console.table({
    Mupi: `http://localhost:${PORT}/mupi`,
    Mobile: `http://localhost:${PORT}/mobile`,
  });
});

// 4. Create the server in real time using SOCKET.IO
const io = new Server(server, {
  path: "/real-time",
});

// 5. Connect the server in order to listen to the events on the ecosystem.
io.on("connection", (socket) => {
  console.log("Connected!", socket.id);

  //the server listens to the event "sending-color" and broadcasts the message to the event "receiving-color"
  socket.on("sending-color", (message) => {
    socket.broadcast.emit("receiving-color", message);
  });
});

// 6. Set SERIALPORT Configuration
const protocolConfiguration = {
  path: "/dev/cu.usbserial-A50285BI",
  baudRate: 9600,
};
const serialPort = new SerialPort(protocolConfiguration);
const parser = serialPort.pipe(new ReadlineParser());

let arduinoMessage = {
  r: null,
  g: null,
  b: null,
};
// 7. Listen to the SERIALPORT connection
parser.on("data", (data) => {
  console.log(data);

  //Split the data to gather it on an array
  let dataArray = data.split(" ");
  console.log(dataArray);

  //parse the data from string to int
  arduinoMessage.r = parseInt(dataArray[0]);
  arduinoMessage.g = parseInt(dataArray[1]);
  arduinoMessage.b = parseInt(dataArray[2]);

  console.log(arduinoMessage);

  //send the data to the event on the mupi
  io.emit("receiving-color", arduinoMessage);
});
