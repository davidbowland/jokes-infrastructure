const AWS = require('aws-sdk')

const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

const setDataByIndex = async (index, data) => {
  const params = {
    Item: {
      Index: {
        N: `${index}`,
      },
      Data: {
        S: JSON.stringify(data),
      },
    },
    TableName: DYNAMODB_TABLE_NAME,
  }
  await dynamodb.putItem(params).promise()
}

const getPayloadFromEvent = (event) => {
  try {
    return JSON.parse(
      event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body
    )
  } catch (error) {
    return {}
  }
}

exports.handler = async (event) => {
  try {
    const payload = getPayloadFromEvent(event)
    const index = parseInt(event.pathParameters?.jokeId, 10)
    if (isNaN(index) || !payload.joke) {
      return { statusCode: 400 } // Bad request
    }

    await setDataByIndex(index, { joke: payload.joke })

    return { statusCode: 204 } // No content
  } catch (error) {
    console.error(error)
    return { statusCode: 500 } // Internal server error
  }
}
