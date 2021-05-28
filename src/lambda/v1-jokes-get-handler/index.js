const AWS = require('aws-sdk')

const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME
const FETCH_COUNT_MAXIMUM = parseInt(process.env.FETCH_COUNT_MAXIMUM, 10)

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

const getDataByIndexes = async (indexes) => {
  const params = {
    RequestItems: {
      [DYNAMODB_TABLE_NAME]: {
        Keys: indexes.map((index) => ({
          Index: {
            N: `${index}`,
          },
        })),
      },
    },
  }
  const items = await dynamodb.batchGetItem(params).promise()
  return items?.Responses[DYNAMODB_TABLE_NAME].reduce((result, item) => {
    result[item.Index.N] = JSON.parse(item.Data.S)
    return result
  }, {})
}

const getIntFromString = (str, options) => {
  const value = parseInt(str, 10)
  const limitedValue = options?.max === undefined ? value : Math.min(value, options.max)
  return isNaN(value) ? options?.default : limitedValue
}

const referenceIndex = 0

exports.handler = async (event) => {
  try {
    const referenceInfo = await getDataByIndexes([referenceIndex])
    const maxIndex = referenceInfo[referenceIndex].count

    const offset = getIntFromString(event.queryStringParameters?.offset, { default: 1 })
    const limit = getIntFromString(event.queryStringParameters?.limit, {
      default: 10,
      max: Math.min(FETCH_COUNT_MAXIMUM, maxIndex - offset + 1),
    })
    if (offset < 1 || offset > maxIndex || limit < 1) {
      return { statusCode: 400 } // Bad request
    }

    const indexes = Array.from({ length: limit }).map((_, index) => offset + index)
    const result = await getDataByIndexes(indexes)

    return {
      statusCode: 200, // OK
      body: JSON.stringify(result),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500 } // Internal server error
  }
}
