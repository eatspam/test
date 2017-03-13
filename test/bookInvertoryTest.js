/**
 * Created by mradojewski on 13.03.2017.
 */

var assert = require("assert");
var sum = require('./sum');

describe("Duap", function () {
    it('should do sth', function(done) {
        setTimeout(function() {
          assert.equal(sum(1,1), 2);
          done();
        }, 100);
    })
})
