'use strict';
const RPCREQUEST = require('./rpcrequest');
const WEB3 = require('./ethweb3');
const BUSINESS = require('./web3business');

const PERSONAL = require('./rpc_personal');
const ETH = require('./rpc_eth');
const ADMIN = require('./rpc_admin');
const RPCMODULE = require('./rpc_module');

var ETHRPCJS = function(rpcprotocol, rpcaddr, rpcport) {
  this.rpcprotocol = rpcprotocol || 'http';
  this.rpcaddr = rpcaddr || 'localhost';
  this.rpcport = rpcport || 8545;

  this.rpcrequest = new RPCREQUEST(this, 1);
  this.web3 = new WEB3(this);
  this.web3business = new BUSINESS(this);

  this.personal = new PERSONAL(this);
  this.eth = new ETH(this);
  this.admin = new ADMIN(this);
  this.rpcmodule = new RPCMODULE(this);

  return this;
};

module.exports = ETHRPCJS;
