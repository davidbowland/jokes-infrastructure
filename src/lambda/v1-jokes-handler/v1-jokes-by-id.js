const { jokeTableReferenceIndex } = require('./config.js')
const { deleteDataByIndex, getDataByIndex, setDataByIndex } = require('./dynamodb.js')
const { getPayloadFromEvent } = require('./event-processing.js')
const status = require('./status.js')

// /v1/jokes/{jokeId}

const getById = async (requestJokeId) => {
  const jokeInfo = await getDataByIndex(requestJokeId)
  if (jokeInfo.joke === undefined) {
    return status.NOT_FOUND
  }

  return { ...status.OK, body: JSON.stringify(jokeInfo) }
}

const putById = async (requestJokeId, jokeInfo) => {
  if (!jokeInfo.joke) {
    return status.BAD_REQUEST
  }
  await setDataByIndex(requestJokeId, { joke: jokeInfo.joke })
  return status.NO_CONTENT
}

const deleteById = async (requestJokeId, referenceInfo) => {
  const finalIndex = referenceInfo.count
  if (requestJokeId < finalIndex) {
    const finalJoke = await getDataByIndex(finalIndex)
    await setDataByIndex(requestJokeId, finalJoke)
  }
  await deleteDataByIndex(finalIndex)

  await setDataByIndex(jokeTableReferenceIndex, {
    ...referenceInfo,
    count: Math.max(finalIndex - 1, 0),
  })
  return status.NO_CONTENT
}

exports.processById = async (event) => {
  const requestJokeId = parseInt(event.pathParameters?.jokeId, 10)
  if (isNaN(requestJokeId) || requestJokeId < 0 || requestJokeId == jokeTableReferenceIndex) {
    return status.BAD_REQUEST
  }

  const referenceInfo = { count: 0, ...(await getDataByIndex(jokeTableReferenceIndex)) }
  if (requestJokeId > referenceInfo.count) {
    return status.NOT_FOUND
  }

  switch (event.httpMethod) {
    case 'GET':
      return await getById(requestJokeId, referenceInfo)
    case 'PUT':
      return await putById(requestJokeId, getPayloadFromEvent(event))
    case 'DELETE':
      return await deleteById(requestJokeId, referenceInfo)
    default:
      console.error(`processById received unexpected method ${event.httpMethod}`)
  }

  return status.BAD_REQUEST
}
