var assert = require('assert');
const checkRPIntranet = require('./checkRPIntranet');
const RPCREQUEST = require('./../src/rpcrequest')

describe('RPC REQUEST MODULE', function () {
  describe('#construction', function () {

    it('should return function when typeof RPCREQUEST', function () {
      assert.equal(typeof RPCREQUEST, "function");
    });

    var rpcrequest = new RPCREQUEST();
    it('should return object when typeof rpcrequest', function () {
      assert.equal(typeof rpcrequest, "object");
    });
    it('should return json data when get rpcrequest', function () {
      assert.deepEqual(rpcrequest, {
        rpcaddr: 'localhost',
        rpcport: 8545,
        requestid: 0
      });
    });
    it('should return function when rpcrequest.request', function () {
      assert.equal(typeof rpcrequest.request, "function");
    });

    var rpcrequest2 = new RPCREQUEST('10.1.1.30');
    it('should return object when typeof rpcrequest with rpcaddr', function () {
      assert.equal(typeof rpcrequest2, "object");
    });
    it('should return json data when get rpcrequest with rpcaddr', function () {
      assert.deepEqual(rpcrequest2, {
        rpcaddr: '10.1.1.30',
        rpcport: 8545,
        requestid: 0
      });
    });
    it('should return function when rpcrequest.request with rpcaddr', function () {
      assert.equal(typeof rpcrequest2.request, "function");
    });

    var rpcrequest3 = new RPCREQUEST('10.1.1.30', 8888);
    it('should return object when typeof rpcrequest with rpcaddr, rpcport', function () {
      assert.equal(typeof rpcrequest3, "object");
    });
    it('should return json data when get rpcrequest with rpcaddr, rpcport', function () {
      assert.deepEqual(rpcrequest3, {
        rpcaddr: '10.1.1.30',
        rpcport: 8888,
        requestid: 0
      });
    });
    it('should return function when rpcrequest.request with rpcaddr, rpcport', function () {
      assert.equal(typeof rpcrequest3.request, "function");
    });

    var rpcrequest4 = new RPCREQUEST('10.1.1.30', 8888, 55);
    it('should return object when typeof rpcrequest with rpcaddr, rpcport, id', function () {
      assert.equal(typeof rpcrequest4, "object");
    });
    it('should return json data when get rpcrequest with rpcaddr, rpcport, id', function () {
      assert.deepEqual(rpcrequest4, {
        rpcaddr: '10.1.1.30',
        rpcport: 8888,
        requestid: 55
      });
    });
    it('should return function when rpcrequest.request with rpcaddr, rpcport, id', function () {
      assert.equal(typeof rpcrequest4.request, "function");
    });
  }); //END describe construction

  describe('Method request on RP localnet', function () {
    if (checkRPIntranet()) {
      var rpcrequest_test = new RPCREQUEST('10.1.1.30', 8545, 1);

      it('should return function when rpcrequest.request', function () {
        assert.equal(typeof rpcrequest_test.request, "function");
      });
      it('should return json data when get rpcrequest with rpcaddr, rpcport, id', function () {
        assert.deepEqual(rpcrequest_test, {
          rpcaddr: '10.1.1.30',
          rpcport: 8545,
          requestid: 1
        });
      });

      it('should return id = 1 when request(rpc_modules)', function (done) {
        rpcrequest_test.request('rpc_modules', '')
          .then(function (resdata) {
            done((resdata.data.id == 1) ? null : "data from resdata.data.id is not equal to 1");
          });
      });
      it('should return id = 2 when request(rpc_modules)', function (done) {
        rpcrequest_test.request('rpc_modules', '')
          .then(function (resdata) {
            done((resdata.data.id == 2) ? null : "data from resdata.data.id is not equal to 2");
          });
      });
    }
  }); //END describe Method request

  describe('Method request on RP localnet example', function () {
    if (checkRPIntranet()) {
      var rpcrequest_test = new RPCREQUEST('10.1.1.30', 8545, 1);

      it('should return function when rpcrequest.request', function () {
        assert.equal(typeof rpcrequest_test.request, "function");
      });
      var res_promise = rpcrequest_test.request('rpc_modules', '');

      it('should return statusCode === 200 when request(rpc_modules)', function (done) {
        res_promise.then(function (resdata) {
          done((resdata.statusCode === 200) ? null : "data from resdata.data.statusCode is not equal to 200");
        });
      });
      it('should return complete === true when request(rpc_modules)', function (done) {
        res_promise.then(function (resdata) {
          done((resdata.complete === true) ? null : "data from resdata.data.complete is not equal to true");
        });
      });
    }
  }); //END describe Method request
}); //END RPC REQUEST MODULE
