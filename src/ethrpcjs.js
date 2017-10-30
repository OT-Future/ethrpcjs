'use strict';
const RPCREQUEST = require('./rpcrequest');
const WEB3 = require('./ethweb3');

var ETHRPCJS = function(rpcaddr, rpcport) {
  this.rpcaddr = rpcaddr || 'localhost';
  this.rpcport = rpcport || 8545;
  this.rpcrequest = new RPCREQUEST(this.rpcaddr, this.rpcport, 1);
  this._web3 = new WEB3(this.rpcaddr, this.rpcport);
  this._web3.module = this._web3.getModule();

  return this;
};

ETHRPCJS.prototype.web3 = {
  newAccount: function(passphase) {
    return this._web3.newAccount(passphase);
  },
  getAccounts: function() {
    return this._web3.getAccounts();
  }
};

ETHRPCJS.prototype.personal = {
  listAccounts: function(rpcrequest) {
    return rpcrequest.request('personal_listAccounts');
  },
  newAccount: function(rpcrequest) {
    return rpcrequest.request('personal_newAccount');
  }
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
  }
};
ETHRPCJS.prototype.admin = {
  nodeInfo: function(rpcrequest) {
    return rpcrequest.request('admin_nodeInfo');
  }
};

module.exports = ETHRPCJS;
