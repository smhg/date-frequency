var Frequency = require('../lib/frequency');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

module.exports = {
  'on': function (test) {
    var f = new Frequency(),
      tmp = f.on('hour', 10);

    test.deepEqual(f, tmp, 'on should return frequency object');
    test.equal(typeof f.rules, 'array', 'on should create rules property');

    f.on('day', 6).on('hour', 10);

    test.equal(f.rules.length, 2, 'rules should be chainable');

    test.done();
  },
  'next': function (test) {
    var f = new Frequency();

    f.on('hour', 10);

    test.equal(f.next(new Date(2013, 8, 2)), new Date(2013, 8, 2, 10, 0, 0), 'next should return next instance');

    test.done();
  },
  'between': function (test) {
    var f = new Frequency(),
      start = new Date(2013, 8, 2),
      end = new Date(2013, 8, 9);

    f.on('hour', 10);

    test.equal(f.between(start, end).length, 7, 'between should return an array of dates');

    test.done();
  }
};
