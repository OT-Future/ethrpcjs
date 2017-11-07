'use strict';

var ADMIN = function(parent) {
  this.parent = parent;
  return this;
};

ADMIN.prototype.nodeInfo = function() {
  return this.parent.rpcrequest.request('admin_nodeInfo');
};

module.exports = ADMIN;
