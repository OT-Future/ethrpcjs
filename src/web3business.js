'use strict';
const businessFactory = require('./business.json');
var abi = {
  ReadyERC20: require('./ReadyERC20.json')
};

var BUSINESS = function(_web3) {
  this.web3 = _web3;
  this.contractInterface = new this.web3.eth.Contract(
    businessFactory.interface,
    businessFactory.address
  );

  return this;
};

BUSINESS.prototype.setWeb3 = function(_web3) {
  this.web3 = _web3;
  return this;
};

BUSINESS.prototype.getBusinessContract = function(
  businessToken = '0x8119298427634f57882C20Cf4b8C3C1F28432Cc4',
  businessPosition = 0
) {
  return new Promise(function(resolve, reject) {
    if (!this.web3) return reject('web3 not set');
    var businessContract = {
      address: '',
      abiInterface: ''
    };
    this.contractInterface.methods.OwnedBusiness(businessToken, businessPosition).call().then(function(data) {
        data.abi = abi[data[4].replace('.json','')];
        var buzContract = new web3.eth.Contract(data.abi,data[3]);        
        console.log('data', data);
        return resolve(buzContract);
      }).catch(function(error) {
        console.log('error', error);
      });

    return resolve(businessContract);
  });
};

module.exports = BUSINESS;
