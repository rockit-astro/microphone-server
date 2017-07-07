var BinaryServer = require('binaryjs').BinaryServer;
var mic = require('./microphone.js');

var clients = [];

var server = BinaryServer({port: process.argv[2]});

server.on('connection', function(client) {
  clients.push(client);
});

mic.startCapture({
  device: process.argv[3],
  sampleRate: 22050,
  bufferTime: 500000
});

mic.audioStream.on('data', function(data) {
  for (var i = clients.length - 1; i >= 0; i--) {
    try {
      clients[i].send(data);
    }
    catch (err) {
      clients.splice(i, 1);
    }
  }
});