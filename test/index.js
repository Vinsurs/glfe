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
  it('would throw error when get an non-exist prop path', () => {
    let obj = {
      foo: {
        bar: "bar"
      }
    }
    assert.throws(
      () => glfe.get(obj, 'foo.not.exist.prop'), 
      err => {
        assert(err instanceof Error)
        return true
      },
      'expected error'
    )
  })
  it('would be undefined instead of throw error when find an non-exist prop path', () => {
    let obj = {
      foo: {
        bar: "bar"
      }
    }
    assert.doesNotThrow(() => glfe.find(obj, 'foo.not.exist.prop'))
    assert.deepEqual(glfe.find(obj, 'foo.not.exist.prop'), undefined)
  })
  it('would not be undefined when find the prop value is falsy', () => {
    let obj = {
      foo: {
        zero: 0,
        empty: '',
        nan: NaN,
        undef: undefined,
        nil: null,
        bFalse: false
      }
    }
    assert.deepEqual(glfe.find(obj, 'foo.zero'), 0)
    assert.deepEqual(glfe.find(obj, 'foo.empty'), "")
    assert.deepEqual(isNaN(glfe.find(obj, 'foo.nan')), true)
    assert.deepEqual(glfe.find(obj, 'foo.undef'), undefined)
    assert.deepEqual(glfe.find(obj, 'foo.nil'), null)
    assert.deepEqual(glfe.find(obj, 'foo.bFalse'), false)
  })
});
