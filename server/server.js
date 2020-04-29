const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = 5001;

//middleware - this gets run on each call
app.use(express.json()); // this is so we can access req.body

//routes
const sample = require("./routes/api/sample.js");

//URLs to access each API
// app.use("/api/sample", sample);

//both seem to do the same thing for two ports
app.get("/api/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let interval = 10; //change this to set time

let counter = interval;
let pose = 1;

setInterval(() => {
  counter--;
  if (counter === 0) {
    counter = interval;
    pose++;
    if (pose > 3) {
      pose = 1;
    }
    io.emit("next", pose);
  }
}, 1000);

setInterval(() => {
  io.emit("timer", counter);
}, 1000);

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("next", pose);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

http.listen(5000, () => {
  console.log("listening on port 5000");
});
