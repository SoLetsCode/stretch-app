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

let counter = 10;

setInterval(() => {
  counter--;
  if (counter === 0) {
    counter = 10;
    io.emit("next");
  }
}, 1000);

io.on("connection", (socket) => {
  console.log("a user connected");

  setInterval(() => {
    socket.broadcast.emit("timer", counter);
  }, 1000);

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
