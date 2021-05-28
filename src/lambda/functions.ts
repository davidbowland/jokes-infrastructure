import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import { joke_lambda_role } from '../iam/roles'
import { dbowland_jokes_table } from '../dynamodb/tables'
import { createdBy, createdFor, fetchCountMaximum, lambdaTimeoutInSeconds } from '../vars'

export const zip_v1_jokes_get_handler = new aws.lambda.Function('zip-v1-jokes-get-handler', {
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive(`${__dirname}/v1-jokes-get-handler`),
  }),
  environment: {
    variables: {
      DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
      FETCH_COUNT_MAXIMUM: fetchCountMaximum,
    },
  },
  handler: 'index.handler',
  name: 'v1-jokes-get-handler',
  role: joke_lambda_role.arn,
  runtime: 'nodejs14.x',
  timeout: lambdaTimeoutInSeconds,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const zip_v1_jokes_get_single_handler = new aws.lambda.Function(
  'zip-v1-jokes-get-single-handler',
  {
    code: new pulumi.asset.AssetArchive({
      '.': new pulumi.asset.FileArchive(`${__dirname}/v1-jokes-get-single-handler`),
    }),
    environment: {
      variables: {
        DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
      },
    },
    handler: 'index.handler',
    name: 'v1-jokes-get-single-handler',
    role: joke_lambda_role.arn,
    runtime: 'nodejs14.x',
    timeout: lambdaTimeoutInSeconds,
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  }
)

export const zip_v1_jokes_random_handler = new aws.lambda.Function('zip-v1-jokes-random-handler', {
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive(`${__dirname}/v1-jokes-random-handler`),
  }),
  environment: {
    variables: {
      DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
      FETCH_COUNT_MAXIMUM: fetchCountMaximum,
    },
  },
  handler: 'index.handler',
  name: 'v1-jokes-random-handler',
  role: joke_lambda_role.arn,
  runtime: 'nodejs14.x',
  timeout: lambdaTimeoutInSeconds,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const zip_v1_jokes_post_handler = new aws.lambda.Function('zip-v1-jokes-post-handler', {
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive(`${__dirname}/v1-jokes-post-handler`),
  }),
  environment: {
    variables: {
      DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
    },
  },
  handler: 'index.handler',
  name: 'v1-jokes-post-handler',
  role: joke_lambda_role.arn,
  runtime: 'nodejs14.x',
  timeout: lambdaTimeoutInSeconds,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const zip_v1_jokes_put_handler = new aws.lambda.Function('zip-v1-jokes-put-handler', {
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive(`${__dirname}/v1-jokes-put-handler`),
  }),
  environment: {
    variables: {
      DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
    },
  },
  handler: 'index.handler',
  name: 'v1-jokes-put-handler',
  role: joke_lambda_role.arn,
  runtime: 'nodejs14.x',
  timeout: lambdaTimeoutInSeconds,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const zip_v1_jokes_delete_handler = new aws.lambda.Function('zip-v1-jokes-delete-handler', {
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive(`${__dirname}/v1-jokes-delete-handler`),
  }),
  environment: {
    variables: {
      DYNAMODB_TABLE_NAME: dbowland_jokes_table.name,
    },
  },
  handler: 'index.handler',
  name: 'v1-jokes-delete-handler',
  role: joke_lambda_role.arn,
  runtime: 'nodejs14.x',
  timeout: lambdaTimeoutInSeconds,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
