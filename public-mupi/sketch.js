//Get DNS from the URL
const DNS = getDNS;

//Import socket to listen or send messages using events.
const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, {
  path: "/real-time",
});

let r = 0;
let g = 255;
let b = 0;

let rectangleObject;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectangleObject = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    width: 100,
    height: 50,
  };
}

function draw() {
  background(0, 50);
  fill(r, g, b);
  rectMode(CENTER);
  rect(
    rectangleObject.x,
    rectangleObject.y,
    rectangleObject.width,
    rectangleObject.height
  );
  rectMode(CORNER);
}

socket.on("receiving-color", (color) => {
  r = color.r;
  g = color.g;
  b = color.b;
});
