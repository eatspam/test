/**
 * Created by mradojewski on 13.03.2017.
 */

var assert = require("assert");
var sum = require('./sum');

describe("Math", function () {

    it('should work just fine', function(done) {
        setTimeout(function() {
          assert.equal(sum(1,1), 2);
          done();
        }, 100);
    });
});

var result;

function createRoutes() {
    var fakeBookRepository = {
        getStock: function(isbn) {
            return Promise.resolve(result);
        }
    }
    return require('../src/routes')(fakeBookRepository);
}

describe('Routes', function () {

    it('should work with getStock returning null', function(done) {
        var routes = createRoutes();
        result = null;
        var next = function() { assert.fail('unexoected call to next')};
        var req = { params: { isbn: 'dupa'}};
        var res = {
            status: function(status) {
                assert.equal(status, 404);
                return {
                    send: function(msg) {
                        assert.equal(msg, 'item not found');
                        done();
                    }
                }
            },
            send: function(status, data) {
                assert.fail('unexoected call to send')
            }
        };
        routes.getStock(req, res, next);
    });

    it('should work with getStock returning some value', function(done) {
        var routes = createRoutes();
        result = { count: 20 };
        var next = function() { assert.fail('unexoected call to next')};
        var req = { params: { isbn: 'dupa'}};
        var res = {
            status: function(status) {
                assert.fail('unexoected call to status')
                return {
                    send: function(msg) {
                        assert.fail('unexoected call to send')
                    }
                }
            },
            send: function(status, data) {
                assert.equal(status, 200);
                assert.equal(data, 20);
                done();
            }
        };
        routes.getStock(req, res, next);
    });
});
