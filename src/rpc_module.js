'use strict';

var RPCMODULE = function(parent) {
  this.parent = parent;
  return this;
};

RPCMODULE.prototype.nodeInfo = function() {
  return this.parent.rpcrequest.request('admin_nodeInfo');
};

RPCMODULE.prototype.modules = function() {
  return this.parent.rpcrequest.request('admin_nodeInfo');
};

module.exports = RPCMODULE;
