var assert = require('assert');
const checkRPIntranet = require('./checkRPIntranet');
const ETHRPCJS = require('./../src/ethrpcjs')

describe('ETHRPCJS', function () {
  describe('#construction', function () {
    it('should return function when typeof ETHRPCJS', function () {
      assert.equal(typeof ETHRPCJS, "function");
    });

    var ethrpcjs1 = new ETHRPCJS();
    it('should return object when typeof ethrpcjs', function () {
      assert.equal(typeof ethrpcjs1, "object");
    });
    it('should return JSON data when get ethrpcjs', function () {
      assert.deepEqual(ethrpcjs1, {
        rpcaddr: 'localhost',
        rpcport: 8545
      });
    });

    var ethrpcjs2 = new ETHRPCJS('10.1.1.30');
    it('should return object when typeof ethrpcjs with rpcaddr', function () {
      assert.equal(typeof ethrpcjs2, "object");
    });
    it('should return json data when get ethrpcjs with rpcaddr', function () {
      assert.deepEqual(ethrpcjs2, {
        rpcaddr: '10.1.1.30',
        rpcport: 8545
      });
    });

    var ethrpcjs3 = new ETHRPCJS('10.1.1.30', 8888);
    it('should return object when typeof ethrpcjs with rpcaddr', function () {
      assert.equal(typeof ethrpcjs3, "object");
    });
    it('should return json data when get ethrpcjs with rpcaddr, rpcport', function () {
      assert.deepEqual(ethrpcjs3, {
        rpcaddr: '10.1.1.30',
        rpcport: 8888
      });
    });
  }); //END describe #constructure

  describe('@admin', function () {
    if (checkRPIntranet()) {
      var ethrpcjs = new ETHRPCJS('10.1.1.30');
      it('should return object when typeof ethrpcjs with rpcaddr', function () {
        assert.equal(typeof ethrpcjs, "object");
      });
      it('should return function when typeof ethrpcjs.admin', function () {
        assert.equal(typeof ethrpcjs.admin, "function");
      });

      describe('- rpc', function () {
        it('should return function when typeof ethrpcjs.rpc.modules', function () {
          assert.equal(typeof ethrpcjs.rpc().modules, "function");
        });
        var pm_rpcModules = ethrpcjs.rpc().modules();
        it('should return JSON data when ethrpcjs.rpc().modules()', function (done) {
          pm_rpcModules.then(function (resdata) {
              try {
                if (resdata.data.result)
                  done();
                else
                  done('Not contain result')
              } catch (error) {
                done('try error:' + error.message);
              }
            })
            .catch(function (error) {
              done('error:' + error.message);
            })
        });
      });
      describe('- nodeInfo', function () {
        it('should return function when typeof ethrpcjs,admin.nodeInfo', function () {
          assert.equal(typeof ethrpcjs.admin().nodeInfo, "function");
        });
        var pm_nodeInfo = ethrpcjs.admin().nodeInfo();
        it('should return JSON data when ethrpcjs,admin.nodeInfo()', function (done) {
          pm_nodeInfo.then(function (resdata) {
              try {
                if (resdata.data.result)
                  done();
                else
                  done('Not contain result')
              } catch (error) {
                done('try error:' + error.message);
              }
            })
            .catch(function (error) {
              done('error:' + error.message);
            })
        });
      });
    }
  });
});