const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const path = require("path");

const port = 3000;

const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});