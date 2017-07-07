var spawn = require('child_process').spawn
var PassThrough = require('stream').PassThrough;
var ps = null;

var audio = new PassThrough;
var info = new PassThrough;

var start = function(options) {
  options = options || {};
  if(ps == null) {
    ps = spawn('arecord', ['-D', options.device, '-f', 'FLOAT_LE', '--buffer-time=' + options.bufferTime, '-r', options.sampleRate]);
    ps.stdout.pipe(audio);
    ps.stderr.pipe(info);
  }
};

var stop = function() {
  if(ps) {
    ps.kill();
    ps = null;
  }
};

exports.audioStream = audio;
exports.infoStream = info;
exports.startCapture = start;
exports.stopCapture = stop;
