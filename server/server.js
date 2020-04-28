const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

http.listen(5000, () => {
  console.log("listening on port 5000");
});