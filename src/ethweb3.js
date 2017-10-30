const Web3 = require('web3');

var WEB3 = function(rpcendpoint = 'localhost', rpcport = '8545') {
  this.web3 = new Web3(
    new Web3.providers.HttpProvider('http://' + rpcendpoint + ':' + rpcport)
  );
  
  return this;
};
WEB3.prototype.getAccounts = function() {
  return this.web3.eth.personal.getAccounts();
};
WEB3.prototype.newAccount = function(passphase) {
  return this.web3.eth.personal.newAccount(passphase);
};

WEB3.prototype.getModule = function(){
  return this.web3;
}

module.exports = WEB3;
