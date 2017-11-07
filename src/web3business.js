'use strict';
const businessFactory = require('./business.json');
var abi = {
  ReadyERC20: require('./ReadyERC20.json')
};

var BUSINESS = function(parent) {
  this._parent = parent;
  this.web3 = this._parent.web3.getModule();
  this.abiTemplate = {
    ReadyERC20: require('./ReadyERC20.json')
  };

  this.contractInterface = new this.web3.eth.Contract(
    businessFactory.interface,
    businessFactory.address
  );

  return this;
};

BUSINESS.prototype.getBusinessContract = function(
  businessToken,
  businessPosition
) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    if (!_this.web3) return reject('web3 not set');
    var businessContract = {
      address: '',
      abiInterface: ''
    };
    _this.contractInterface.methods
      .OwnedBusiness(businessToken, businessPosition)
      .call()
      .then(function(data) {
        var abiType = data[4].replace('.json', '');
        data.abi = _this.abiTemplate[abiType];
        var buzContract = new _this.web3.eth.Contract(data.abi, data[3]);
        //console.log('BUSINESS.prototype.getBusinessContract data', buzContract);
        return resolve(buzContract);
      })
      .catch(function(error) {
        //console.log('BUSINESS.prototype.getBusinessContract error', error);
        return reject(error);
      });
  });
};

module.exports = BUSINESS;
