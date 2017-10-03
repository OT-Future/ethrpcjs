const os = require('os');
module.exports = function (localnet) {
  localnet = localnet || '10.1';
  var ifs = os.networkInterfaces();
  for (var if_name in ifs) {
    var if_info = ifs[if_name];

    for (var i = 0; i < if_info.length; i++) {
      var if_element = if_info[i];
      if (if_element.family === 'IPv4' && if_element.address.indexOf(localnet) > -1)
        return true;
    }
  }

  return false;
}