import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/iam/role/

export const joke_lambda_role = new aws.iam.Role('joke-lambda-role', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
        Effect: 'Allow',
        Sid: '',
      },
    ],
  }),
  description: 'Lambda assumable role',
  name: 'joke-lambda-role',
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
