import * as awsx from '@pulumi/awsx'

import { userPool } from './user-pools'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/authorizer/

export const authorizer = awsx.apigateway.getCognitoAuthorizer({
  authorizerName: 'jokes-cognito-authorizer',
  authorizerResultTtlInSeconds: 300,
  providerARNs: [userPool.arn],
})
