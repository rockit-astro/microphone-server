var config = {
  port: process.argv[2],
  device: process.argv[3],
  sampleRate: 22050,
  bufferTime: 100000
};

var BinaryServer = require('binaryjs').BinaryServer;
var spawn = require('child_process').spawn

var server = BinaryServer({port: config.port});
var clients = [];
var arecord = null;

var startStreaming = function() {
  var firstChunk = true;
  arecord = spawn('arecord', ['-D', config.device, '-f', 'FLOAT_LE', '--buffer-time=' + config.bufferTime, '-r', config.sampleRate]);
  arecord.stdout.on('data', function(data) {
    if (firstChunk) {
      firstChunk = false;
      return;
    }

    for (var i = clients.length - 1; i >= 0; i--) {
      try {
        clients[i].send(data);
      }
      catch (err) {
        clients.splice(i, 1);
        if (clients.length == 0 && arecord != null) {
          arecord.kill();
          arecord = null;
        }
      }
    }
  });
}

server.on('connection', function(client) {
  clients.push(client);
  if (arecord == null)
    startStreaming();
});


