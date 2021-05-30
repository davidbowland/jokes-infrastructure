const { corsMethods, corsOrigins, defaultOrigin } = require('./config.js')

// CORS

exports.getReferrerOriginFromEvent = (event) => {
  try {
    return event?.headers?.Origin ?? new URL(event?.headers?.Referer ?? '').origin
  } catch (error) {
    return ''
  }
}

exports.getCorsHeadersFromEvent = (event) => {
  const origin = exports.getReferrerOriginFromEvent(event)
  const methods = corsMethods[event.resource] ?? 'OPTIONS'
  return {
    'Access-Control-Allow-Headers':
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Origin': corsOrigins.includes(origin) ? origin : defaultOrigin,
    'Access-Control-Allow-Methods': methods,
  }
}

// Body

exports.getPayloadFromEvent = (event) => {
  try {
    return JSON.parse(
      event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body
    )
  } catch (error) {
    return {}
  }
}

// Query string parameters

exports.getIntFromParameter = (event, parameterName, options) => {
  const availableParameters = event.queryStringParameters ?? {}
  const value = parseInt(availableParameters[parameterName], 10)
  return isNaN(value) ? options?.default : value
}

exports.getListFromParameter = (event, parameterName) => {
  const availableParameters = event.queryStringParameters ?? {}
  return availableParameters[parameterName]?.split(',') ?? []
}
