// DynamoDB

exports.dynamodbTableName = process.env.DYNAMODB_TABLE_NAME
exports.fetchCountMaximum = parseInt(process.env.FETCH_COUNT_MAXIMUM, 10)
exports.jokeTableReferenceIndex = parseInt(process.env.JOKE_TABLE_REFERENCE_INDEX, 10)

// Resources

exports.resourceByID = process.env.RESOURCE_BY_ID
exports.resourcePlain = process.env.RESOURCE_PLAIN
exports.resourceRandom = process.env.RESOURCE_RANDOM

// CORS

exports.corsOrigins = process.env.CORS_ORIGINS.split(',')
exports.defaultOrigin = process.env.DEFAULT_ORIGIN
exports.corsMethods = {
  [exports.resourceByID]: 'OPTIONS,GET,PUT,DELETE',
  [exports.resourcePlain]: 'OPTIONS,GET,POST',
  [exports.resourceRandom]: 'OPTIONS,GET',
}
