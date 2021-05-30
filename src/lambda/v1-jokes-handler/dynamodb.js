const AWS = require('aws-sdk')
const { dynamodbTableName } = require('./config.js')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.getDataByIndex = async (index) => {
  const params = {
    Key: {
      Index: {
        N: `${index}`,
      },
    },
    TableName: dynamodbTableName,
  }
  const item = await dynamodb.getItem(params).promise()
  try {
    return JSON.parse(item?.Item?.Data?.S)
  } catch (error) {
    return {}
  }
}

exports.getDataByIndexBatch = async (indexes) => {
  const params = {
    RequestItems: {
      [dynamodbTableName]: {
        Keys: indexes.map((index) => ({
          Index: {
            N: `${index}`,
          },
        })),
      },
    },
  }
  const items = await dynamodb.batchGetItem(params).promise()
  return items?.Responses[dynamodbTableName].reduce((result, item) => {
    result[item.Index.N] = JSON.parse(item.Data.S)
    return result
  }, {})
}

exports.setDataByIndex = async (index, data) => {
  const params = {
    Item: {
      Index: {
        N: `${index}`,
      },
      Data: {
        S: JSON.stringify(data),
      },
    },
    TableName: dynamodbTableName,
  }
  await dynamodb.putItem(params).promise()
}

exports.deleteDataByIndex = async (index) => {
  const params = {
    Key: {
      Index: {
        N: `${index}`,
      },
    },
    TableName: dynamodbTableName,
  }
  await dynamodb.deleteItem(params).promise()
}
