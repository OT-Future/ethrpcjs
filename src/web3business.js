'use strict'
var BUSINESS = function(_web3){
  this.web3 = _web3; 
  return this;
}

BUSINESS.prototype.setWeb3 = function(_web3){
  this.web3 = _web3; 
  return this;
}

BUSINESS.prototype.getBusinessContract = function(businessToken){
  return new Promise(function(resolve,reject){
    if(!this.web3) return reject('web3 not set');
    var businessContract = {
      address : '',
      abiInterface : ''
    }
    
    return resolve(businessContract);
  })
}

module.exports = BUSINESS;