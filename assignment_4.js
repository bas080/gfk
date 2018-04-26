const request = require('request-promise-native')
const assert = require('assert')

function apply(fn, args) {
  return args => fn(...args)
}

function getHelloWorld() {
  return Promise.all([
    request('https://cdn.gfkdaphne.com/tests/async.php?a=1'),
    request('https://cdn.gfkdaphne.com/tests/async.php?a=2'),
  ])
    .then(([a, b]) => `${a} ${b}`)
}

getHelloWorld()
  .then(str => assert.equal(str, 'Hello world!'))
