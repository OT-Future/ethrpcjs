var os = require('os');
var isDebug = false;
var DEBUG = isDebug ? DEBUG : function() {};
var ERROR = console.error;

var BUSINESS = function(parent) {
  this.businessFactory = require('./interfaceABI/Business.json');
  this._parent = parent;
  this.web3 = this._parent.web3.getModule();
  this.abiTemplate = {
    ReadyERC20: require('./interfaceABI/ReadyERC20.json'),
    ReadyERC20ADV: require('./interfaceABI/ReadyERC20ADV.json'),
    ReadyERC21ADV: require('./interfaceABI/ReadyERC21ADV.json')
  };

  var contractAddress = this.businessFactory.address;
  if (this._parent.isProduction) {
    contractAddress = this.businessFactory.addressReadyEther;
  }
  DEBUG('contractAddress', contractAddress);
  this.contractInterface = new this.web3.eth.Contract(this.businessFactory.interface, contractAddress);

  return this;
};

BUSINESS.prototype.getBusinessContract = function(businessToken, businessPosition) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    if (!_this.web3) return reject('web3 not set');
    var businessContract = {
      address: '',
      abiInterface: ''
    };
    DEBUG('BUSINESS.prototype.getBusinessContract params', businessToken, businessPosition);
    _this.contractInterface.methods
      .OwnedBusiness(businessToken, businessPosition)
      .call()
      .then(function(data) {
        DEBUG('BUSINESS.prototype.getBusinessContract data', data);
        var BuzAddress = data.businessContractAddress || '';
        var abiType = data.interfaceABI.replace('.json', '') || 'ReadyERC21ADV';
        var abi = _this.abiTemplate[abiType];
        var buzContract = new _this.web3.eth.Contract(abi, BuzAddress);
        DEBUG('BUSINESS.prototype.getBusinessContract data', buzContract);
        return resolve(buzContract);
      })
      .catch(function(error) {
        ERROR('BUSINESS.prototype.getBusinessContract error', error);
        return reject(error);
      });
  });
};

module.exports = BUSINESS;
