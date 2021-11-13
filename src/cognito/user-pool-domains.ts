import * as aws from '@pulumi/aws'

import { userPool } from './user-pools'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpooldomain/

export const userPoolDomain = new aws.cognito.UserPoolDomain('dbowland', {
  domain: 'dbowland',
  userPoolId: userPool.id,
})
