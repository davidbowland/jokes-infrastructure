const { fetchCountMaximum, jokeTableReferenceIndex } = require('./config.js')
const { getDataByIndex, getDataByIndexBatch, setDataByIndex } = require('./dynamodb.js')
const { getIntFromParameter, getPayloadFromEvent } = require('./event-processing.js')
const status = require('./status.js')

// /v1/jokes

const getPlain = async (referenceInfo, offset, limit) => {
  if (offset > referenceInfo.count) {
    return status.NOT_FOUND
  } else if (limit < 1 || offset < 0 || offset == jokeTableReferenceIndex) {
    return status.BAD_REQUEST
  }

  const fetchCount = Math.min(limit, fetchCountMaximum, referenceInfo.count - offset + 1)
  const indexes = Array.from({ length: fetchCount }).map((_, index) => offset + index)
  const batchJokes = await getDataByIndexBatch(indexes)

  return { ...status.OK, body: JSON.stringify(batchJokes) }
}

const postPlain = async (referenceInfo, jokeInfo) => {
  if (!jokeInfo.joke) {
    return status.BAD_REQUEST
  }

  const newIndex = referenceInfo.count + 1
  await setDataByIndex(jokeTableReferenceIndex, { ...referenceInfo, count: newIndex })

  await setDataByIndex(newIndex, { joke: jokeInfo.joke })

  return { ...status.CREATED, body: JSON.stringify({ id: newIndex }) }
}

exports.processPlain = async (event) => {
  const referenceInfo = { count: 0, ...(await getDataByIndex(jokeTableReferenceIndex)) }

  switch (event.httpMethod) {
    case 'GET':
      return await getPlain(
        referenceInfo,
        getIntFromParameter(event, 'offset', { default: 1 }),
        getIntFromParameter(event, 'limit', { default: 10 })
      )
    case 'POST':
      return await postPlain(referenceInfo, getPayloadFromEvent(event))
    default:
      console.error(`processPlain received unexpected method ${event.httpMethod}`)
  }

  return status.BAD_REQUEST
}
