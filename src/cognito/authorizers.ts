import * as awsx from '@pulumi/awsx'

import { jokes_users_user_pool } from './user-pools'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/authorizer/

export const jokes_cognito_authorizer = awsx.apigateway.getCognitoAuthorizer({
  authorizerName: 'jokes-cognito-authorizer',
  authorizerResultTtlInSeconds: 300,
  providerARNs: [jokes_users_user_pool.arn],
})
