var exec = require('child_process').exec;
var path = require('path');
var cmdBase = path.join(__dirname, '../..', '/util/plantping/build/ppinger');


exports.pingNode = function (nodeName, cb) {
  var cmd = cmdBase + ' ' + nodeName;
  exec(cmd, (err, stdout, stderr) => {
    cb(stdout);
  });
}
