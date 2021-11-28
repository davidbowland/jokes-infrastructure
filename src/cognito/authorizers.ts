import * as awsx from '@pulumi/awsx'

import { userPool } from './user-pools'
import { projectName } from '@vars'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/authorizer/

export const authorizer = awsx.apigateway.getCognitoAuthorizer({
  authorizerName: `${projectName}-cognito-authorizer`,
  authorizerResultTtlInSeconds: 300,
  providerARNs: [userPool.arn],
})
