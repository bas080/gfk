const d3 = require('d3')

const prop = key => obj => obj[key]
const date = prop('DATE')
const answer = prop('ANSWER')
const first = prop(0)

function toPairs(obj) {
  return Object.keys(obj).map(key => [key, obj[key]])
}

function groupBy(groupFn, data) {
  return data.reduce((grouped, item) => {
    const group = groupFn(item)

    grouped[group] = [...(grouped[group] || []), item]

    return grouped
  }, {})
}

function assoc(key, value, obj) {
  return {
    ...obj,
    [key]: value,
  }
}

function mapValues(mapFn, obj) {
  return Object.keys(obj).reduce(
    (acc, key) => assoc(key, mapFn(obj[key]), acc),
    {}
  )
}

function yesRatio(votes) {
  if (votes.length === 0)
    throw RangeError('expected an array of length greater than 0')

  const grouped = groupBy(answer, votes)

  return grouped.yes.length / votes.length
}

function noRatio(votes) {
  return 1 - yesRatio(votes)
}

function lineChart(paramConfig) {
  const config = {
    ...paramConfig,
    container: d3.select(paramConfig.container),
  }

  config.container.style('width', config.width)
  config.container.style('height', config.height)
  config.container
    .append('path')
    .datum(config.data)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', config.line)
}

const toDate = d3.timeParse('%d-%m-%Y')

function voteLineChart(config) {
  const x = d3
    .scaleTime()
    .rangeRound([0, config.width])
    .domain(d3.extent(config.data, first))

  const y = d3
    .scaleLinear()
    .rangeRound([config.height, 0])
    .domain([0, 1])

  const line = d3
    .line()
    .x(a => x(first(a)))
    .y(a => y(a[1]))

  return lineChart({
    ...config,
    line: line,
  })
}

function voteLineChartExample() {
  d3.dsv(';', './data.csv')
  .then(votes => {
    return voteLineChart({
      container: window.document.getElementsByTagName('svg')[0],
      width: 1024,
      height: 768,
      data: toPairs(mapValues(yesRatio, groupBy(date, votes))).map(item => {
        item[0] = toDate(item[0])

        return item
      }),
    })
  })
}

voteLineChartExample()
