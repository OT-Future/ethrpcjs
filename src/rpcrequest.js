const http = require('http');

var RPCREQUEST = function (rpcaddr, rpcport, requestid) {
  this.rpcaddr = rpcaddr || 'localhost';
  this.rpcport = rpcport || 8545
  this.requestid = requestid || 0;

  return this;
}

RPCREQUEST.prototype.request = function (method, params, param_options) {
  if (typeof params['push'] !== 'undefined') params = [params];

  var data = {
    jsonrpc: "2.0",
    id: this.requestid++,
    method: method,
    params: params
  }
  var postData = querystring.stringify(data);

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
    http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      var res_chunk = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        res_chunk += chunk;
      });
      res.on('end', () => {
        console.log('No more data in response.');
        return resolve(res_chunk);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end();
  })
}