const path = require("path");
const express = require("express");
const WebSocket = require("ws");
const app = express();

const http = require("http");
const server = http.createServer(app);

const WS_PORT = 8888;
const HTTP_PORT = process.env.PORT || 8000;

const wsServer = new WebSocket.Server({ port: WS_PORT }, () => {
  // const wsServer = new WebSocket.Server({ server }, () => {
  console.log(`WS server running on port ${WS_PORT}`);
  // console.log(`WS server running on port ${server}`);
});

let connectedClients = [];
wsServer.on("connection", (ws, req) => {
  console.log("Connected to new client");
  connectedClients.push(ws);

  ws.on("message", (data) => {
    connectedClients.forEach((ws, i) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      } else {
        connectedClients.splice(i, 1);
      }
    });
  });
});

app.get("/client", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client.html"));
});
// app.listen(HTTP_PORT, (req, res) => {
server.listen(HTTP_PORT, (req, res) => {
  console.log(`HTTP server listening at ${HTTP_PORT}`);
});
