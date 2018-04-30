const request = require('request-promise-native')
const assert = require('assert')

function join(d) {
  return arr => arr.join(d)
}

function getHelloWorld() {
  return Promise.all([
    request('https://cdn.gfkdaphne.com/tests/async.php?a=1'),
    request('https://cdn.gfkdaphne.com/tests/async.php?a=2'),
  ])
    .then(join(' '))
}

getHelloWorld()
  .then(str => assert.equal(str, 'Hello world!'))
