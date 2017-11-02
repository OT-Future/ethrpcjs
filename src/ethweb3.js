const Web3 = require('web3');

var WEB3 = function(parent) {
  this.parent = parent;
  this.rpcprotocol = parent.rpcprotocol || 'http';
  this.rpcaddr = parent.rpcaddr || 'localhost';
  this.rpcport = parent.rpcport || 8545;

  var endpoint =
    this.rpcprotocol + '://' + this.rpcaddr + ':' + this.rpcport;
  this.web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

  return this;
};
WEB3.prototype.getAccounts = function() {
  return this.web3.eth.personal.getAccounts();
};
WEB3.prototype.newAccount = function(passphase) {
  return this.web3.eth.personal.newAccount(passphase);
};

WEB3.prototype.getModule = function() {
  return this.web3;
};

module.exports = WEB3;
