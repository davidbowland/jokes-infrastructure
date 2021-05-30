const { fetchCountMaximum, jokeTableReferenceIndex } = require('./config.js')
const { getDataByIndex, getDataByIndexBatch } = require('./dynamodb.js')
const { getIntFromParameter, getListFromParameter } = require('./event-processing.js')
const status = require('./status.js')

// /v1/jokes/random

const getRandomIndex = (count, avoids) => {
  if (avoids.length >= count) {
    avoids.length = 0
  }
  const maxIndex = count - avoids.length
  const randomIndex = Math.floor(Math.random() * maxIndex + 1)

  const performIndexAvoid = (index) => {
    const avoidIndex = avoids.indexOf(`${index}`) + 1
    return avoidIndex == 0 ? index : performIndexAvoid(maxIndex + avoidIndex)
  }
  return performIndexAvoid(randomIndex, avoids)
}

const getRandom = async (referenceInfo, count, avoids) => {
  if (count < 1 || count > referenceInfo.count) {
    return status.BAD_REQUEST
  }

  const fetchCount = Math.min(count, fetchCountMaximum, referenceInfo.count)
  const indexes = Array.from({ length: fetchCount }).map(() => {
    const index = getRandomIndex(referenceInfo.count, avoids)
    avoids.push(`${index}`)
    return index
  })
  const batchJokes = await getDataByIndexBatch(indexes)

  return { ...status.OK, body: JSON.stringify(batchJokes) }
}

exports.processRandom = async (event) => {
  const referenceInfo = { count: 0, ...(await getDataByIndex(jokeTableReferenceIndex)) }

  switch (event.httpMethod) {
    case 'GET':
      return await getRandom(
        referenceInfo,
        getIntFromParameter(event, 'count', { default: 1 }),
        getListFromParameter(event, 'avoid')
      )
    default:
      console.error(`processRandom received unexpected method ${event.httpMethod}`)
  }

  return status.BAD_REQUEST
}
