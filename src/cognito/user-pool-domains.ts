import * as aws from '@pulumi/aws'

import { jokes_users_user_pool } from './user-pools'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpooldomain/

export const dbowland_user_pool_domain = new aws.cognito.UserPoolDomain('dbowland', {
  domain: 'dbowland',
  userPoolId: jokes_users_user_pool.id,
})
