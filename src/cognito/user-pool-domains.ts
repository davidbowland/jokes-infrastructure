import * as aws from '@pulumi/aws'

import { userPool } from './user-pools'
import { projectName } from '@vars'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpooldomain/

export const userPoolDomain = new aws.cognito.UserPoolDomain('dbowland', {
  domain: `dbowland-${projectName}`,
  userPoolId: userPool.id,
})
