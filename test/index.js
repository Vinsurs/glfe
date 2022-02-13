const assert = require('assert');
const glfe = require('../index');

describe('glfe api', function() {
  it('glfe"s get ans set would works', function() {
    let obj = {
      a: {
        b: [ { c: 3 } ],
        d: 4
      }
    }
    glfe.set(obj, "a.e", 1)
    let seter = glfe.set(obj, "a[b][r!][2]", 66)
    assert.equal(obj.a.e, 1)
    assert.equal(glfe.get(obj, "a[b][r][2]"), 66)
    assert.deepEqual(
      seter,
      obj,
    );
  });
});
