const assert = require('assert')

/* using class syntax */

function classExample() {
  class A {
    callMe() {
      return 'called'
    }
  }

  class B extends A {}

  const a = new A()
  const b = new B()

  /* tests */

  assert.equal(a.callMe(), 'called')
  assert.equal(b.callMe(), 'called')
  assert.ok(b instanceof A)
  assert.equal(a instanceof B, false)
}

/* using prototype */

function prototypeExample() {
  function A() {}
  A.prototype.callMe = () => 'called'

  function B() {}
  B.prototype = Object.create(A.prototype)

  const a = new A()
  const b = new B()

  assert.equal(a.callMe(), 'called')
  assert.equal(b.callMe(), 'called')
  assert.ok(b instanceof A)
  assert.equal(a instanceof B, false)
}

prototypeExample()
classExample()
