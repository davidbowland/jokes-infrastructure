const { resourceByID, resourcePlain, resourceRandom } = require('./config.js')
const { getCorsHeadersFromEvent } = require('./event-processing.js')
const status = require('./status.js')
const { processById } = require('./v1-jokes-by-id.js')
const { processPlain } = require('./v1-jokes-plain.js')
const { processRandom } = require('./v1-jokes-random.js')

const processRequest = async (event) => {
  try {
    if (event.httpMethod == 'OPTIONS') {
      return status.OK
    }
    switch (event.resource) {
      case resourceByID:
        return await processById(event)
      case resourcePlain:
        return await processPlain(event)
      case resourceRandom:
        return await processRandom(event)
      default:
        console.error(`handler received unexpected resource ${event.resource}`)
    }
    return status.BAD_REQUEST
  } catch (error) {
    console.error(error)
    return { ...status.INTERNAL_SERVER_ERROR }
  }
}

exports.handler = async (event) => {
  try {
    const corsHeaders = getCorsHeadersFromEvent(event)
    const result = await processRequest(event)
    return { headers: corsHeaders, ...result }
  } catch (error) {
    console.error(error)
  }
}
