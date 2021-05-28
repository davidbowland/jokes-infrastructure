const AWS = require('aws-sdk')

const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

const getDataByIndex = async (index) => {
  const params = {
    Key: {
      Index: {
        N: `${index}`,
      },
    },
    TableName: DYNAMODB_TABLE_NAME,
  }
  const item = await dynamodb.getItem(params).promise()
  try {
    return JSON.parse(item?.Item?.Data?.S)
  } catch (error) {
    return {}
  }
}

const referenceIndex = 0

exports.handler = async (event) => {
  try {
    const requestedJokeId = parseInt(event.pathParameters?.jokeId, 10)
    if (isNaN(requestedJokeId) && requestedJokeId != referenceIndex) {
      return { statusCode: 400 } // Bad request
    }

    const jokeInfo = await getDataByIndex(requestedJokeId)
    if (jokeInfo.joke === undefined) {
      return { statusCode: 404 } // Not found
    }

    return {
      statusCode: 200, // OK
      body: JSON.stringify(jokeInfo),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500 } // Internal server error
  }
}
