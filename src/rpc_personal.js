'use strict';

var PERSONAL = function(parent) {
  this.parent = parent;
  return this;
};

PERSONAL.prototype.listAccounts = function() {
  return this.parent.rpcrequest.request('personal_listAccounts');
};

PERSONAL.prototype.newAccount = function() {
  return this.parent.rpcrequest.request('personal_newAccount');
};

module.exports = PERSONAL;
