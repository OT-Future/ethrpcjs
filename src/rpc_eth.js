'use strict';

var ETH = function(parent) {
  this.parent = parent;
  return this;
};

ETH.prototype.getBalance = function(params) {
  return this.parent.rpcrequest.request('eth_getBalance', params);
};

module.exports = ETH;
