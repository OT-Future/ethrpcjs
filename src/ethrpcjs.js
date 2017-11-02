'use strict';
const RPCREQUEST = require('./rpcrequest');
const WEB3 = require('./ethweb3');
const BUSINESS = require('./web3business');
const PERSONAL = require('./rpc_personal');

var ETHRPCJS = function(rpcprotocol, rpcaddr, rpcport) {
  this.rpcprotocol = rpcprotocol || 'http';
  this.rpcaddr = rpcaddr || 'localhost';
  this.rpcport = rpcport || 8545;

  this.rpcrequest = new RPCREQUEST(this, 1);
  this.web3 = new WEB3(this);
  this.web3business = new BUSINESS(this);

  this.personal = new PERSONAL(this);

  return this;
};

ETHRPCJS.prototype.eth = {
  getBalance: function(rpcrequest, params) {
    console.log('getBalance.params', params);
    return rpcrequest.request('eth_getBalance', params);
  }
};

ETHRPCJS.prototype.rpc = {
  modules: function(rpcrequest) {
    return rpcrequest.request('rpc_modules');
  },
  getModule: function() {
    return this._web3.getModule();
  }
};
ETHRPCJS.prototype.admin = {
  nodeInfo: function(rpcrequest) {
    return rpcrequest.request('admin_nodeInfo');
  }
};

module.exports = ETHRPCJS;
