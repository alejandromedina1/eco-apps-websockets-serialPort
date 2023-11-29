//Get DNS from the URL
const DNS = getDNS;

//Import socket to listen or send messages using events.
const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, {
  path: "/real-time",
});

let radioButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  radioButton = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    diameter: 50,
  };
}

function draw() {
  background(0, 50);
  fill(0, 0, 255);
  circle(radioButton.x, radioButton.y, radioButton.diameter);
}

function mousePressed() {
  radioButtonClick();
}

function radioButtonClick() {
  if (dist(mouseX, mouseY, radioButton.x, radioButton.y) <= 25) {
    //Send the event to change the color of the rectangle on MUPI
    console.log("click");
    const color = {
      r: 0,
      g: 0,
      b: 255,
    };

    //Emit the message to the server with the event "sending-color"
    socket.emit("sending-color", color);
  }
}
