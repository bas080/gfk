const assert = require('assert')

/* helpers */

function isDivisibleBy(n) {
  return value => value % n === 0 && value !== 0
}

function and(predA, predB) {
  return (...args) => predA(...args) && predB(...args)
}

const isNil = v => v == null
const isDivisibleByThree = isDivisibleBy(3)
const isDivisibleByFive = isDivisibleBy(5)
const isDivisibleByThreeAndFive = and(isDivisibleByThree, isDivisibleByFive)
const identity = v => v
const always = v => () => v
const otherwise = always(true)

function cond([pred, fn, ...cases]) {
  if (isNil(pred)) return always(undefined)

  return (...args) => (pred(...args) ? fn(...args) : cond(cases)(...args))
}

function times(fn, n) {
  n = n - 1

  if (n === 0) return [fn(n)]

  return [...times(fn, n), fn(n)]
}

/* app */

const fizzAppz = cond([
  isDivisibleByThreeAndFive, always('FizzAppz'),
  isDivisibleByThree, always('Fizz'),
  isDivisibleByFive, always('Appz'),
  otherwise, identity,
])

/* test */

assert.deepEqual(
  times(fizzAppz, 100),
  [ 0,
    1,
    2,
    'Fizz',
    4,
    'Appz',
    'Fizz',
    7,
    8,
    'Fizz',
    'Appz',
    11,
    'Fizz',
    13,
    14,
    'FizzAppz',
    16,
    17,
    'Fizz',
    19,
    'Appz',
    'Fizz',
    22,
    23,
    'Fizz',
    'Appz',
    26,
    'Fizz',
    28,
    29,
    'FizzAppz',
    31,
    32,
    'Fizz',
    34,
    'Appz',
    'Fizz',
    37,
    38,
    'Fizz',
    'Appz',
    41,
    'Fizz',
    43,
    44,
    'FizzAppz',
    46,
    47,
    'Fizz',
    49,
    'Appz',
    'Fizz',
    52,
    53,
    'Fizz',
    'Appz',
    56,
    'Fizz',
    58,
    59,
    'FizzAppz',
    61,
    62,
    'Fizz',
    64,
    'Appz',
    'Fizz',
    67,
    68,
    'Fizz',
    'Appz',
    71,
    'Fizz',
    73,
    74,
    'FizzAppz',
    76,
    77,
    'Fizz',
    79,
    'Appz',
    'Fizz',
    82,
    83,
    'Fizz',
    'Appz',
    86,
    'Fizz',
    88,
    89,
    'FizzAppz',
    91,
    92,
    'Fizz',
    94,
    'Appz',
    'Fizz',
    97,
    98,
    'Fizz'
  ])

