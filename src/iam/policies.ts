import * as aws from '@pulumi/aws'

import { dbowland_jokes_table } from '../dynamodb/tables'
import { createdBy, createdFor, environmentVariableKmsArn } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/iam/policy/

export const joke_access_dynamodb_policy = new aws.iam.Policy('joke-access-dynamodb', {
  path: '/',
  description: 'Full access to joke table in DynamoDB',
  policy: dbowland_jokes_table.name.apply((jokesTableName) =>
    JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'ListAndDescribe',
          Effect: 'Allow',
          Action: [
            'dynamodb:List*',
            'dynamodb:DescribeReservedCapacity*',
            'dynamodb:DescribeLimits',
            'dynamodb:DescribeTimeToLive',
          ],
          Resource: '*',
        },
        {
          Sid: 'SpecificTable',
          Effect: 'Allow',
          Action: [
            'dynamodb:BatchGet*',
            'dynamodb:DescribeStream',
            'dynamodb:DescribeTable',
            'dynamodb:Get*',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:BatchWrite*',
            'dynamodb:CreateTable',
            'dynamodb:Delete*',
            'dynamodb:Update*',
            'dynamodb:PutItem',
          ],
          Resource: `arn:aws:dynamodb:*:*:table/${jokesTableName}`,
        },
      ],
    })
  ),
  name: 'joke-access-dynamodb',
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const lambda_kms_access_policy = new aws.iam.Policy('lambda-kms-access', {
  path: '/',
  description: 'Access to KMS for Lambdas to decrypt environment variables',
  policy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: ['kms:Decrypt'],
        Resource: [environmentVariableKmsArn],
      },
    ],
  }),
  name: 'lambda-kms-access',
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
