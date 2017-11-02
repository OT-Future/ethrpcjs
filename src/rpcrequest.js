const http = require('http');
const querystring = require('querystring');

var RPCREQUEST = function (parent, requestid) {
  this.parent = parent;
  this.rpcaddr = parent.rpcaddr || 'localhost';
  this.rpcport = parent.rpcport || 8545
  this.requestid = requestid || 0;

  return this;
}
module.exports = RPCREQUEST;

RPCREQUEST.prototype.request = function (method, params, param_options) {
  if (!params || typeof params !== 'object') params = [params];

  var data = {
    jsonrpc: "2.0",
    id: this.requestid++,
    method: method,
    params: params
  }
  console.log('ETHRPCJS.request.data', data);
  var postData = JSON.stringify(data);

  var options = {
    hostname: this.rpcaddr,
    port: this.rpcport,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  return new Promise(function (resolve, reject) {    
    var req = http.request(options, (res) => {
      var res_chunk = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        res_chunk += chunk;
      });
      res.on('end', () => {
        res.data = JSON.parse(res_chunk);
        return resolve(res);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      return reject(e);
    });

    req.write(postData);
    req.end();
  })
}