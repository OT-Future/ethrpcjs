'use strict'
const RPCREQUEST = require('./rpcrequest');

var ETHRPCJS = function (rpcaddr, rpcport) {
  this.rpcaddr = rpcaddr || 'localhost';
  this.rpcport = rpcport || 8545;

  return this;
}
ETHRPCJS.prototype.rpc = function () {
  var PREFIX = 'rpc_';
  var rpcrequest = new RPCREQUEST(this.rpcaddr, this.rpcport, 1)
  return {
    modules: function () {
      return rpcrequest.request(PREFIX + 'modules');
    }
  }
}
ETHRPCJS.prototype.admin = function () {
  var PREFIX = 'admin_';
  var rpcrequest = new RPCREQUEST(this.rpcaddr, this.rpcport, 1)
  return {
    nodeInfo: function () {
      return rpcrequest.request(PREFIX + 'nodeInfo');
    }
  }
}

module.exports = ETHRPCJS;