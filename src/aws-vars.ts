import { S3 } from 'aws-sdk'

const s3 = new S3({ apiVersion: '2006-03-01' })

export const getV1JokesHandlerVersion = async (): Promise<string> => {
  const v1JokesHandlerParams = {
    Bucket: 'dbowland-lambda-source',
    Key: 'v1-jokes-handler.zip',
  }
  const response = await s3.headObject(v1JokesHandlerParams).promise()
  return response.VersionId ?? ''
}
