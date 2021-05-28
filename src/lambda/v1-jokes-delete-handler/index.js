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

const deleteDataByIndex = async (index) => {
  const params = {
    Key: {
      Index: {
        N: `${index}`,
      },
    },
    TableName: DYNAMODB_TABLE_NAME,
  }
  await dynamodb.deleteItem(params).promise()
}

const referenceIndex = 0

exports.handler = async (event) => {
  try {
    const requestedJokeId = parseInt(event.pathParameters?.jokeId, 10)
    if (isNaN(requestedJokeId) && requestedJokeId != referenceIndex) {
      return { statusCode: 400 } // Bad request
    }

    const referenceInfo = await getDataByIndex(referenceIndex)
    const finalIndex = referenceInfo.count ?? 0
    if (requestedJokeId > finalIndex) {
      return { statusCode: 404 } // Not found
    } else if (requestedJokeId < finalIndex) {
      const finalJoke = await getDataByIndex(finalIndex)
      await setDataByIndex(requestedJokeId, finalJoke)
    }
    await deleteDataByIndex(finalIndex)
    await setDataByIndex(referenceIndex, { count: Math.max(finalIndex - 1, 0) })

    return { statusCode: 204 } // No content
  } catch (error) {
    console.error(error)
    return { statusCode: 500 } // Internal server error
  }
}
