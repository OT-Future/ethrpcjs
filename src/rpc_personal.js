'use strict';

var PERSONAL = function(parent) {
  this.parent = parent;
  return this;
};

PERSONAL.prototype.listAccounts = function() {
  return this.parent.rpcrequest.request('personal_listAccounts');
};

PERSONAL.prototype.newAccount = function(params, params_option) {
  return this.parent.rpcrequest.request('personal_newAccount', params, params_option);
};

module.exports = PERSONAL;
