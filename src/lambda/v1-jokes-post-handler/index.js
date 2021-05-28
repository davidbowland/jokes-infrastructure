const AWS = require('aws-sdk')

const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

const referenceIndex = 0

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
    if (!payload.joke) {
      return { statusCode: 400 } // Bad request
    }

    const referenceInfo = await getDataByIndex(referenceIndex)
    const newIndex = (referenceInfo.count ?? 0) + 1
    await setDataByIndex(referenceIndex, { ...referenceInfo, count: newIndex })

    await setDataByIndex(newIndex, { joke: payload.joke })

    return {
      statusCode: 201, // Created
      body: JSON.stringify({ id: newIndex }),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500 } // Internal server error
  }
}
