import * as awsx from '@pulumi/awsx'

import { cognitoUserPool } from './user-pools'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/authorizer/

export const cognitoAuthorizer = awsx.apigateway.getCognitoAuthorizer({
  authorizerName: 'jokes-cognito-authorizer',
  authorizerResultTtlInSeconds: 300,
  providerARNs: [cognitoUserPool.arn],
})
