import * as aws from '@pulumi/aws'

import { getV1JokesHandlerVersion } from '../aws-vars'
import { joke_lambda_role } from '../iam/roles'
import { dbowland_jokes_table } from '../dynamodb/tables'
import {
  createdBy,
  createdFor,
  corsOrigins,
  defaultOrigin,
  fetchCountMaximum,
  jokeTableReferenceIndex,
  lambdaTimeoutInSeconds,
  resourceById,
  resourcePlain,
  resourceRandom,
} from '../vars'

export const zip_v1_jokes_handler = new aws.lambda.Function('zip-v1-jokes-handler', {
  environment: {
    variables: {
      CORS_ORIGINS: corsOrigins,
      DEFAULT_ORIGIN: defaultOrigin,
      DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
      FETCH_COUNT_MAXIMUM: fetchCountMaximum,
      JOKE_TABLE_REFERENCE_INDEX: jokeTableReferenceIndex,
      RESOURCE_BY_ID: resourceById,
      RESOURCE_PLAIN: resourcePlain,
      RESOURCE_RANDOM: resourceRandom,
    },
  },
  handler: 'index.handler',
  name: 'v1-jokes-handler',
  role: joke_lambda_role.arn,
  runtime: aws.lambda.Runtime.NodeJS14dX,
  s3Bucket: 'dbowland-lambda-source',
  s3Key: 'v1-jokes-handler.zip',
  s3ObjectVersion: getV1JokesHandlerVersion(),
  timeout: lambdaTimeoutInSeconds,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
